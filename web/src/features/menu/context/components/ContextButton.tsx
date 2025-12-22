import { Button, createStyles, Group, HoverCard, Image, Progress, Stack, Text } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { ContextMenuProps, Option } from '../../../../typings';
import { fetchNui } from '../../../../utils/fetchNui';
import { isIconUrl } from '../../../../utils/isIconUrl';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import MarkdownComponents from '../../../../config/MarkdownComponents';
import LibIcon from '../../../../components/LibIcon';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: false });
};

const clickContext = (id: string) => {
  fetchNui('clickContext', id);
};

const useStyles = createStyles((theme, params: { disabled?: boolean; readOnly?: boolean }) => ({
  inner: {
    justifyContent: 'flex-start',
  },
  label: {
    width: '100%',
    whiteSpace: 'pre-wrap',
    padding: 10,
    fontSize: 14,
    fontWeight: 500,
    color: params.disabled
      ? theme.colors[theme.primaryColor][6]
      : theme.colors[theme.primaryColor][3],
    '&:hover': {
      background: theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][9],
      [`& .labelText, & .descriptionText`]: {
        color: theme.colors[theme.primaryColor][9],
      },
      [`& .progressBar`]: {
        background: theme.colors[theme.primaryColor][9],
      },
      [`& .progressRoot`]: {
        background: theme.colors[theme.primaryColor][6],
      },
      cursor: params.readOnly ? 'unset' : 'pointer',
    },
  },
  button: {
    cursor: params.readOnly ? 'unset' : 'pointer',
    background: theme.colors[theme.primaryColor][0] + '1A',
    '&:disabled': {
      background: theme.colors[theme.primaryColor][0] + '0D',
    },
    border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
    borderRadius: 0,
    height: 'fit-content',
    width: '100%',
    padding: 0
  },
  iconImage: {
    maxWidth: '25px',
  },
  description: {
    color: params.disabled
      ? theme.colors[theme.primaryColor][6]
      : theme.colors[theme.primaryColor][3],
    fontSize: '12px',
    fontWeight: 300,
  },
  dropdown: {
    padding: 10,
    color: theme.colors[theme.primaryColor][0],
    fontSize: 14,
    fontWeight: 500,
    maxWidth: 400,
    minWidth: 200,
    background: theme.colors[theme.primaryColor][0] + '1A',
    border: '1px solid ' + theme.colors[theme.primaryColor][0] + '33',
    borderRadius: 0,
  },
  buttonStack: {
    gap: 4,
    flex: '1',
  },
  buttonGroup: {
    gap: 4,
    flexWrap: 'nowrap',
  },
  buttonIconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'left',
  },
  buttonTitleText: {
    overflowWrap: 'break-word',
  },
  buttonArrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
  },
  progressBar: {
    background: params.disabled
      ? theme.colors[theme.primaryColor][6]
      : theme.colors[theme.primaryColor][0]
  },
  progressRoot: {
    background: params.disabled
      ? theme.colors[theme.primaryColor][3] + '1A'
      : theme.colors[theme.primaryColor][0] + '1A'
  }
}));

const ContextButton: React.FC<{
  option: [string, Option];
}> = ({ option }) => {
  const button = option[1];
  const buttonKey = option[0];
  const { classes } = useStyles({ disabled: button.disabled, readOnly: button.readOnly });

  return (
    <>
      <HoverCard
        position="right-start"
        disabled={button.disabled || !(button.metadata || button.image)}
        openDelay={200}
      >
        <HoverCard.Target>
          <Button
            classNames={{ inner: classes.inner, label: `${classes.label} labelText`, root: classes.button }}
            onClick={() =>
              !button.disabled && !button.readOnly
                ? button.menu
                  ? openMenu(button.menu)
                  : clickContext(buttonKey)
                : null
            }
            variant="default"
            disabled={button.disabled}
          >
            <Group position="apart" w="100%" noWrap>
              <Stack className={classes.buttonStack}>
                {(button.title || Number.isNaN(+buttonKey)) && (
                  <Group className={classes.buttonGroup}>
                    {button?.icon && (
                      <Stack className={classes.buttonIconContainer}>
                        {typeof button.icon === 'string' && isIconUrl(button.icon) ? (
                          <img src={button.icon} className={classes.iconImage} alt="Missing img" />
                        ) : (
                          <LibIcon
                            icon={button.icon as IconProp}
                            fixedWidth
                            size="lg"
                            style={{ color: button.iconColor }}
                            animation={button.iconAnimation}
                          />
                        )}
                      </Stack>
                    )}
                    <Text className={classes.buttonTitleText}>
                      <ReactMarkdown components={MarkdownComponents}>{button.title || buttonKey}</ReactMarkdown>
                    </Text>
                  </Group>
                )}
                {button.description && (
                  <Text className={`${classes.description} descriptionText`}>
                    <ReactMarkdown components={MarkdownComponents}>{button.description}</ReactMarkdown>
                  </Text>
                )}
                {button.progress !== undefined && (
                  <Progress 
                    value={button.progress}
                    size="sm"
                    classNames={{ 
                      bar: `${classes.progressBar} progressBar`,
                      root: `${classes.progressRoot} progressRoot`
                    }}
                  />
                )}
              </Stack>
              {(button.menu || button.arrow) && button.arrow !== false && (
                <Stack className={classes.buttonArrowContainer}>
                  <LibIcon icon="chevron-down" fixedWidth />
                </Stack>
              )}
            </Group>
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown className={classes.dropdown}>
          {button.image && <Image src={button.image} />}
          {Array.isArray(button.metadata) ? (
            button.metadata.map(
              (
                metadata: string | { label: string; value?: any; progress?: number; colorScheme?: string },
                index: number
              ) => (
                <>
                  <Text key={`context-metadata-${index}`}>
                    {typeof metadata === 'string' ? `${metadata}` : `${metadata.label}: ${metadata?.value ?? ''}`}
                  </Text>

                  {typeof metadata === 'object' && metadata.progress !== undefined && (
                    <Progress
                      value={metadata.progress}
                      size="sm"
                      color={metadata.colorScheme || button.colorScheme || 'gray.0'}
                      classNames={{ 
                        bar: `${classes.progressBar} progressBar`,
                        root: `${classes.progressRoot} progressRoot`
                      }}
                    />
                  )}
                </>
              )
            )
          ) : (
            <>
              {typeof button.metadata === 'object' &&
                Object.entries(button.metadata).map((metadata: { [key: string]: any }, index) => (
                  <Text key={`context-metadata-${index}`}>
                    {metadata[0]}: {metadata[1]}
                  </Text>
                ))}
            </>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
};

export default ContextButton;
