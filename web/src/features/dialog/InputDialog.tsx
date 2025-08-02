import { Box, Button, Group, Modal, Stack, createStyles, useMantineTheme } from '@mantine/core';
import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { useLocales } from '../../providers/LocaleProvider';
import { fetchNui } from '../../utils/fetchNui';
import type { InputProps } from '../../typings';
import { OptionValue } from '../../typings';
import InputField from './components/fields/input';
import CheckboxField from './components/fields/checkbox';
import SelectField from './components/fields/select';
import NumberField from './components/fields/number';
import SliderField from './components/fields/slider';
import { useFieldArray, useForm } from 'react-hook-form';
import ColorField from './components/fields/color';
import DateField from './components/fields/date';
import TextareaField from './components/fields/textarea';
import TimeField from './components/fields/time';
import dayjs from 'dayjs';
import SlideTransition from '../../transitions/SlideTransition';

export type FormValues = {
  test: {
    value: any;
  }[];
};

const useStyles = createStyles((theme) => ({
  background: {
    width: '100%',
    height: '100vh',
    background: `linear-gradient(to right,`+ theme.colors.dark[9] +`00 0%,`+ theme.colors.dark[9] +`E6 80%)`,
  },
  modal: {
    background: `radial-gradient(circle, `+theme.colors.gray[0]+`1A 0%, `+theme.colors.gray[0]+`1A 80%)`,
    border: '1px solid ' + theme.colors.gray[0] + '33',
    borderRadius: '2px',
    left: '50vh',
    transform: "perspective(1000px) rotateY(-12deg)"
  },
  modalTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors.gray[0],
    textShadow: `1px 1px 2px `+theme.colors.dark[3],
    textAlign: 'center',
    backgroundColor: theme.colors[theme.primaryColor][5] + '80',
    border: '1px solid ' + theme.colors[theme.primaryColor][5] + '80',
  },
  buttonsubmit: {
    color: theme.colors.gray[0],
    backgroundColor: theme.colors.green[6] + '80',
    border: '1px solid ' + theme.colors.green[6] + '80',
    '&:hover': {
      backgroundColor: theme.colors.green[6] + 'CC',
      border: '1px solid ' + theme.colors.green[6] + 'CC',
    },
  },
  buttoncancel: {
    color: theme.colors.gray[0],
    backgroundColor: theme.colors.red[5] + '80',
    border: '1px solid ' + theme.colors.red[5] + '80',
    '&:hover': {
      backgroundColor: theme.colors.red[6] + 'CC',
      border: '1px solid ' + theme.colors.red[6] + 'CC',
    },
  },
}))

const InputDialog: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [fields, setFields] = React.useState<InputProps>({
    heading: '',
    rows: [{ type: 'input', label: '' }],
  });
  const [visible, setVisible] = React.useState(false);
  const { locale } = useLocales();

  const form = useForm<{ test: { value: any }[] }>({});
  const fieldForm = useFieldArray({
    control: form.control,
    name: 'test',
  });

  useNuiEvent<InputProps>('openDialog', (data) => {
    setFields(data);
    setVisible(true);
    data.rows.forEach((row, index) => {
      fieldForm.insert(
        index,
        {
          value:
            row.type !== 'checkbox'
              ? row.type === 'date' || row.type === 'date-range' || row.type === 'time'
                ? // Set date to current one if default is set to true
                  row.default === true
                  ? new Date().getTime()
                  : Array.isArray(row.default)
                  ? row.default.map((date) => new Date(date).getTime())
                  : row.default && new Date(row.default).getTime()
                : row.default
              : row.checked,
        } || { value: null }
      );
      // Backwards compat with new Select data type
      if (row.type === 'select' || row.type === 'multi-select') {
        row.options = row.options.map((option) =>
          !option.label ? { ...option, label: option.value } : option
        ) as Array<OptionValue>;
      }
    });
  });

  useNuiEvent('closeInputDialog', async () => await handleClose(true));

  const handleClose = async (dontPost?: boolean) => {
    setVisible(false);
    await new Promise((resolve) => setTimeout(resolve, 200));
    form.reset();
    fieldForm.remove();
    if (dontPost) return;
    fetchNui('inputData');
  };

  const onSubmit = form.handleSubmit(async (data) => {
    setVisible(false);
    const values: any[] = [];
    for (let i = 0; i < fields.rows.length; i++) {
      const row = fields.rows[i];

      if ((row.type === 'date' || row.type === 'date-range') && row.returnString) {
        if (!data.test[i]) continue;
        data.test[i].value = dayjs(data.test[i].value).format(row.format || 'DD/MM/YYYY');
      }
    }
    Object.values(data.test).forEach((obj: { value: any }) => values.push(obj.value));
    await new Promise((resolve) => setTimeout(resolve, 200));
    form.reset();
    fieldForm.remove();
    fetchNui('inputData', values);
  });

  return (
    <>
      <SlideTransition visible={visible}>
        <Box
          className={classes.background}
        />
      </SlideTransition>
      <Modal
        opened={visible}
        onClose={handleClose}
        centered
        closeOnEscape={fields.options?.allowCancel !== false}
        closeOnClickOutside={false}
        size={fields.options?.size || 'xs'}
        title={fields.heading}
        withCloseButton={false}
        overlayOpacity={0.5}
        transition="fade"
        exitTransitionDuration={150}
        classNames={{
          modal: classes.modal,
          title: classes.modalTitle
        }}
      >
        <form onSubmit={onSubmit}>
          <Stack>
            {fieldForm.fields.map((item, index) => {
              const row = fields.rows[index];
              return (
                <React.Fragment key={item.id}>
                  {row.type === 'input' && (
                    <InputField
                      register={form.register(`test.${index}.value`, { required: row.required })}
                      row={row}
                      index={index}
                    />
                  )}
                  {row.type === 'checkbox' && (
                    <CheckboxField
                      register={form.register(`test.${index}.value`, { required: row.required })}
                      row={row}
                      index={index}
                    />
                  )}
                  {(row.type === 'select' || row.type === 'multi-select') && (
                    <SelectField row={row} index={index} control={form.control} />
                  )}
                  {row.type === 'number' && <NumberField control={form.control} row={row} index={index} />}
                  {row.type === 'slider' && <SliderField control={form.control} row={row} index={index} />}
                  {row.type === 'color' && <ColorField control={form.control} row={row} index={index} />}
                  {row.type === 'time' && <TimeField control={form.control} row={row} index={index} />}
                  {row.type === 'date' || row.type === 'date-range' ? (
                    <DateField control={form.control} row={row} index={index} />
                  ) : null}
                  {row.type === 'textarea' && (
                    <TextareaField
                      register={form.register(`test.${index}.value`, { required: row.required })}
                      row={row}
                      index={index}
                    />
                  )}
                </React.Fragment>
              );
            })}
            <Group position="right" spacing={10}>
              <Button
                uppercase
                variant="default"
                onClick={() => handleClose()}
                mr={3}
                disabled={fields.options?.allowCancel === false}
                className={classes.buttoncancel}
              >
                {locale.ui.cancel}
              </Button>
              <Button 
                uppercase
                variant="light"
                type="submit"
                className={classes.buttonsubmit}
              >
                {locale.ui.confirm}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default InputDialog;
