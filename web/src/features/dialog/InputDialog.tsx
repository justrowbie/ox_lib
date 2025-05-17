import { Box, Button, createStyles, Group, Modal, Stack, useMantineTheme } from '@mantine/core';
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
    backgroundImage: `linear-gradient(to right,`+ theme.colors[theme.primaryColor][8] +`00 40%,`+ theme.colors[theme.primaryColor][8] +`80 80%)`,
  },
  modal: {
    backgroundColor: theme.colors.dark[5] + 'E6',
    boxShadow: theme.colors[theme.primaryColor][5] + ' 0 0 20px 1px',
    borderRadius: '10px',
    left: '70vh',
    transform: "perspective(1000px) rotateY(-12deg)"
  },
  modalTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors[theme.primaryColor][5],
    textAlign: 'center',
    textShadow: '0 0 10px' + theme.colors[theme.primaryColor][5],
    borderBottom: '2px solid ' + theme.colors[theme.primaryColor][5],
    boxShadow: theme.colors[theme.primaryColor][5] + ' 0 5px 5px -5px',
  },
  buttonsubmit: {
    color: theme.colors.gray[0],
    backgroundColor: theme.colors[theme.primaryColor][9],
    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][6]
    },
  },
  buttoncancel: {
    color: theme.colors.gray[0],
    backgroundColor: theme.colors.red[9],
    '&:hover': {
      backgroundColor: theme.colors.red[6]
    },
  },
}));

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
        index, { value: null }
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
        size="xs"
        title={fields.heading}
        withCloseButton={false}
        overlayOpacity={0}
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
              <Button className={classes.buttonsubmit} uppercase type="submit">
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
