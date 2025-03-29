'use client';

import { useEffect, useState } from 'react';
import { addToast } from '@heroui/toast';
import { Card } from '@heroui/react';

import { MyButton } from '@/components/atoms/Button';
import useToast from '@/hooks/useToast';
import { MyInput } from '@/components/atoms/Input';
import { MyCheckbox } from '@/components/atoms/CheckBox';
// import Loading from '@/app/Loading';

export default function Home() {
  const { showToast } = useToast();
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    // showToast({ title: 'Welcome', description: 'me', lazy: true });
    console.log(selected);
  }, [selected]);

  return (
    <>
      <MyButton
        color="main"
        size="full"
        onPress={() =>
          addToast({
            title: 'Toast title',
            description: 'Toast displayed successfully',
            color: 'primary',
          })
        }
      >
        버튼
      </MyButton>
      <div className="absolute ">d</div>
      <MyInput size="md" />

      {/* <MyListBox variant="test">
        <MyListboxItem>ff</MyListboxItem>
        <MyListboxItem>ff</MyListboxItem>

        <MyListboxItem>ff</MyListboxItem>

        <MyListboxItem>ff</MyListboxItem>
        <MyListboxItem>ff</MyListboxItem>
      </MyListBox> */}
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4'].map((value, i) => (
            <MyCheckbox
              key={i}
              color="test"
              isSelected={selected === value}
              name="11:00"
              radius="bg_sm"
              size="full"
              value={value}
              onChange={() => setSelected(value)}
            >
              12:00
            </MyCheckbox>
          ))}
          <p className="text-default-500 text-small">Selected: {selected}</p>
        </div>
      </Card>
      {/* <Loading /> */}
    </>
  );
}
