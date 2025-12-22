import { Box, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { fetchNui } from '../../../utils/fetchNui';
import { isIconUrl } from '../../../utils/isIconUrl';
import ScaleFade from '../../../transitions/ScaleFade';
import type { RadialMenuItem } from '../../../typings';
import { useLocales } from '../../../providers/LocaleProvider';
import LibIcon from '../../../components/LibIcon';

const MENU_SIZE = 400;
const OUTER_RADIUS = 200;
const CENTER_RADIUS = 100;
const INNER_RADIUS = CENTER_RADIUS + 10;
const SECTOR_GAP = 8;
const PAGE_ITEMS = 10;

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  sector: {
    fill: theme.colors[theme.primaryColor][9] + '80',
    color: theme.colors[theme.primaryColor][0],
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    stroke: 'transparent',
    strokeWidth: 2,
    '&:hover': {
      cursor: 'pointer',
      fill: theme.colors[theme.primaryColor][0],
      stroke: theme.colors[theme.primaryColor][0] + '33',
      strokeWidth: 1.5,
      '& g > svg > path': {
        fill: theme.colors[theme.primaryColor][9],
      },
    },
    '&[data-selected="true"]': {
      fill: theme.colors[theme.primaryColor][0],
      stroke: theme.colors[theme.primaryColor][0] + '33',
      color: theme.colors[theme.primaryColor][9],
      strokeWidth: 1.5,
    },
  },
  backgroundCircle: {
    fill: 'transparent',
  },
  centerCircle: {
    fill: theme.colors[theme.primaryColor][9] + '80',
    stroke: theme.colors[theme.primaryColor][9] + '33',
    strokeWidth: 1,
    pointerEvents: 'auto',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      fill: theme.colors[theme.primaryColor][0],
      stroke: theme.colors[theme.primaryColor][0] + '33',
      strokeWidth: 0.5,
    },
  },
  centerIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  centerTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 6,
    padding: '0.4rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    maxWidth: '200px',
  },
  centerTextSpan: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  centerIcon: {
    color: theme.colors[theme.primaryColor][0],
  },
  closeIcon: {
    color: theme.colors[theme.primaryColor][9],
  },
}));

const degToRad = (deg: number) => deg * (Math.PI / 180);

const createSectorPath = (
  centerX: number,
  centerY: number,
  radius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
): string => {
  const startRadians = degToRad(startAngle);
  const endRadians = degToRad(endAngle);

  const startX = centerX + Math.cos(startRadians) * radius;
  const startY = centerY + Math.sin(startRadians) * radius;
  const endX = centerX + Math.cos(endRadians) * radius;
  const endY = centerY + Math.sin(endRadians) * radius;

  const innerStartX = centerX + Math.cos(startRadians) * innerRadius;
  const innerStartY = centerY + Math.sin(startRadians) * innerRadius;
  const innerEndX = centerX + Math.cos(endRadians) * innerRadius;
  const innerEndY = centerY + Math.sin(endRadians) * innerRadius;

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
    L ${innerEndX} ${innerEndY}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
    Z
  `.trim();
};

const RadialMenu: React.FC = () => {
  const { classes } = useStyles();
  const { locale } = useLocales();
  const [visible, setVisible] = useState(false);
  const [menuItems, setMenuItems] = useState<RadialMenuItem[]>([]);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [menu, setMenu] = useState<{ items: RadialMenuItem[]; sub?: boolean; page: number }>({
    items: [],
    sub: false,
    page: 1,
  });

  const [currentSector, setCurrentSector] = useState<RadialMenuItem>();

  const changePage = async (increment?: boolean) => {
    setVisible(false);
    setSelectedSector(null);
    const didTransition: boolean = await fetchNui('radialTransition');
    if (!didTransition) return;
    setVisible(true);
    setMenu({ ...menu, page: increment ? menu.page + 1 : menu.page - 1 });
  };

  const handleClose = async () => {
    try {
      setVisible(false);
      setSelectedSector(null);
      const response = await fetchNui('closeRadial');
      if (!response || !response.success) {
        console.warn("NUI closeRadial event not processed, using fallback.");
      }
      await fetchNui('hideCursor');
    } catch (error) {
      console.error("Error closing radial menu:", error);
    }
  };

  useEffect(() => {
    if (menu.items.length <= PAGE_ITEMS) return setMenuItems(menu.items);

    const items = menu.items.slice(
      PAGE_ITEMS * (menu.page - 1) - (menu.page - 1),
      PAGE_ITEMS * menu.page - menu.page + 1
    );

    if (PAGE_ITEMS * menu.page - menu.page + 1 < menu.items.length) {
      items[items.length - 1] = { icon: 'ellipsis-h', label: locale.ui.more, isMore: true };
    }

    setMenuItems(items);
  }, [menu.items, menu.page]);

  useNuiEvent('openRadialMenu', async (data: { items: RadialMenuItem[]; sub?: boolean; option?: string } | false) => {
    if (!data) {
      setVisible(false);
      setSelectedSector(null);
      return;
    }
    let initialPage = 1;
    if (data.option) {
      data.items.findIndex(
        (item, index) => item.menu === data.option && (initialPage = Math.floor(index / PAGE_ITEMS) + 1)
      );
    }
    setMenu({ ...data, page: initialPage });
    setVisible(true);
  });

  useNuiEvent('refreshItems', (data: RadialMenuItem[]) => {
    setMenu({ ...menu, items: data });
  });

  return (
    <Box
      className={classes.wrapper}
      onContextMenu={async (e) => {
        e.preventDefault();
        if (menu.page > 1) await changePage();
        else if (menu.sub) fetchNui('radialBack');
      }}
    >
      <ScaleFade visible={visible}>
        <svg width={`${MENU_SIZE}px`} height={`${MENU_SIZE}px`} transform="rotate(90)">
          <g transform={`translate(${MENU_SIZE / 2}, ${MENU_SIZE / 2})`}>
            <circle r={OUTER_RADIUS} className={classes.backgroundCircle} />
          </g>
          {menuItems.map((item, index) => {
            const totalSectors = menuItems.length < 3 ? 3 : menuItems.length;
            const pieAngle = 360 / totalSectors;
            const startAngle = index * pieAngle;
            const endAngle = startAngle + pieAngle;

            const angle = degToRad((startAngle + endAngle) / 2);
            const radius = (OUTER_RADIUS + INNER_RADIUS) / 2 - SECTOR_GAP;
            const iconX = MENU_SIZE / 2 + Math.cos(angle) * radius;
            const iconY = MENU_SIZE / 2 + Math.sin(angle) * radius;
            const iconWidth = Math.min(Math.max(item.iconWidth || 50, 0), 100);
            const iconHeight = Math.min(Math.max(item.iconHeight || 50, 0), 100);

            const clickIndex = menu.page === 1 ? index : PAGE_ITEMS * (menu.page - 1) - (menu.page - 1) + index;

            return (
              <g
                key={`${item.label}-${index}`}
                className={classes.sector}
                data-selected={selectedSector === clickIndex}
                onClick={async () => {
                  if (!item.isMore) {
                    setSelectedSector(clickIndex);
                    fetchNui('radialClick', clickIndex);
                  } else {
                    await changePage(true);
                  }
                }}
                onMouseEnter={() => setCurrentSector(item)}
                onMouseLeave={() => setCurrentSector(undefined)}
              >
                <path
                  d={createSectorPath(
                    MENU_SIZE / 2,
                    MENU_SIZE / 2,
                    OUTER_RADIUS - SECTOR_GAP,
                    INNER_RADIUS,
                    startAngle,
                    endAngle
                  )}
                />
                <g transform={`translate(${iconX}, ${iconY}) rotate(-90)`} pointerEvents="none">
                  {typeof item.icon === 'string' && isIconUrl(item.icon) ? (
                    <image
                      href={item.icon}
                      width={iconWidth}
                      height={iconHeight}
                      x={-iconWidth / 2}
                      y={-iconHeight / 2}
                    />
                  ) : (
                    <LibIcon
                      x={-11.5}
                      y={-11.5}
                      icon={item.icon as IconProp}
                      width={25}
                      height={25}
                      fixedWidth
                    />
                  )}
                </g>
              </g>
            );
          })}
          <g
            transform={`translate(${MENU_SIZE / 2}, ${MENU_SIZE / 2})`}
            onClick={handleClose}
            onMouseEnter={() => setIsCloseHovered(true)}
            onMouseLeave={() => setIsCloseHovered(false)}
          >
            <circle r={CENTER_RADIUS} className={classes.centerCircle} />
            {isCloseHovered && (
              <g transform="translate(-12.5, -12.5)">
                <LibIcon
                  x={0}
                  y={0}
                  icon="xmark"
                  width={25}
                  height={25}
                  className={classes.closeIcon}
                  fixedWidth
                />
              </g>
            )}
          </g>
        </svg>
        <div className={classes.centerIconContainer}>
          {currentSector && !isCloseHovered && (
            <div className={classes.centerTextContainer}>
              <span className={classes.centerTextSpan}>
                {currentSector.label.includes('  \n')
                  ? currentSector.label.split('  \n').map((value) => (
                      <span key={value} style={{ display: 'block', marginTop: '0.3em' }}>
                        {value}
                      </span>
                    ))
                  : currentSector.label}
              </span>
            </div>
          )}
        </div>
      </ScaleFade>
    </Box>
  );
};

export default RadialMenu;