import { useForm } from '@mantine/form';
import {
  MantineProvider,
  Button,
  Group,
  Box,
  Title,
  NumberInput,
  Text,
} from '@mantine/core';
import { calculatePeriod, formatPeriod } from './calculator';
import { useState } from 'react';

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Simulator />
    </MantineProvider>
  );
}

function Simulator() {
  const form = useForm({
    initialValues: {
      borrowings: 0,
      apy: 0,
      monthlyRefundAmount: 0,
    },
  });
  const [period, setPeriod] = useState(0);

  function handleOnClick() {
    const { borrowings, apy, monthlyRefundAmount } = form.values;

    try {
      const repaymentPeriod = calculatePeriod(
        borrowings,
        apy,
        monthlyRefundAmount
      );

      setPeriod(() => repaymentPeriod);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  return (
    <Box maw='20em' mx='auto'>
      <Title order={3} weight={100} align='center' mt='2em'>
        借金返済シミュレータ
      </Title>
      <NumberInput
        mt='2em'
        label='借入金額'
        placeholder='例) 100万円なら100'
        withAsterisk
        hideControls
        required
        {...form.getInputProps('borrowings')}
      />
      <NumberInput
        mt='md'
        label='年利(%)'
        placeholder='例) 40％なら40'
        withAsterisk
        hideControls
        required
        {...form.getInputProps('apy')}
      />
      <NumberInput
        mt='md'
        label='毎月の返済額'
        placeholder='例) 3万円なら3'
        withAsterisk
        hideControls
        required
        {...form.getInputProps('monthlyRefundAmount')}
      />

      <Group position='center' mt='xl'>
        <Button variant='outline' onClick={() => handleOnClick()}>
          完済日数を計算
        </Button>
      </Group>

      <Text ta='center' mt='2em' fz='xl'>
        {formatPeriod(period)}年
      </Text>
    </Box>
  );
}
