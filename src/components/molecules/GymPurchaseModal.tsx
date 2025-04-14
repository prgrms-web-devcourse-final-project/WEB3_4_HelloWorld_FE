'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { format, addMonths } from 'date-fns';

import { paperlogy } from '@/config/fonts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Product {
  gymProductId: number;
  gymProductMonth: number;
  gymProductFee: number;
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  gymName: string;
  products: Product[];
}

export default function GymPurchaseModal({
  isOpen,
  onClose,
  gymName,
  products,
}: PurchaseModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [remainingPoint, setRemainingPoint] = useState<number | null>(null);

  const formattedStart = startDate
    ? format(new Date(startDate), 'yyyy.MM.dd')
    : '';
  const formattedEnd =
    startDate && selectedProduct
      ? format(
          addMonths(new Date(startDate), selectedProduct.gymProductMonth),
          'yyyy.MM.dd',
        )
      : '';

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!selectedProduct) return;
      try {
        const res = await fetch(
          `${API_BASE_URL}/gymTicket/purchase/${selectedProduct.gymProductId}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!res.ok) throw new Error('이용권 구매 가능 여부 확인 실패');
        const data = await res.json();

        setIsAvailable(data.available);
        setRemainingPoint(data.memberCash);
      } catch (err) {
        console.error('구매 가능 여부 확인 실패:', err);
        setIsAvailable(false);
      }
    };

    if (selectedProduct) {
      checkAvailability();
    }
  }, [selectedProduct]);

  const handlePurchase = async () => {
    if (!selectedProduct) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/gymTicket/purchase/${selectedProduct.gymProductId}`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (!res.ok) throw new Error('이용권 구매 실패');
      alert('구매가 완료되었습니다.');
      onClose();
    } catch (err) {
      alert('구매 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  const dropdownSelectedKeys = useMemo<Set<string>>(() => {
    return selectedProduct
      ? new Set([String(selectedProduct.gymProductId)])
      : new Set();
  }, [selectedProduct]);

  return (
    <Modal className="font-pretendard" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <span className="text-lg font-bold text-mono_800">
            <span className={`${paperlogy.variable} font-[700]`}>
              <span className="text-mono_800">Gy</span>
              <span className="text-main">M</span>
              <span className="text-mono_800">ate</span>
            </span>{' '}
            헬스장 이용권 구매
          </span>
        </ModalHeader>

        <ModalBody className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-main" />
            <p className="text-base font-semibold text-mono_900">{gymName}</p>
          </div>

          <div className="text-sm font-semibold text-mono_800">이용권 선택</div>

          <Dropdown>
            <DropdownTrigger>
              <Button
                className="capitalize min-w-[160px] max-w-[200px]"
                variant="bordered"
              >
                {selectedProduct
                  ? `${selectedProduct.gymProductMonth}달 (${selectedProduct.gymProductFee.toLocaleString()}원)`
                  : '이용권 선택'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="이용권 선택"
              selectedKeys={dropdownSelectedKeys}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const selectedId = Array.from(keys)[0];
                const product = products.find(
                  (p) => String(p.gymProductId) === selectedId,
                );

                setSelectedProduct(product || null);
              }}
            >
              {products.map((product) => (
                <DropdownItem key={String(product.gymProductId)}>
                  {product.gymProductMonth}달 이용권 :{' '}
                  {product.gymProductFee.toLocaleString()}원
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <div className="text-sm font-semibold text-mono_800">
            헬스장 이용 시작일
          </div>

          <Input
            placeholder="이용권 시작일"
            startContent={
              <CalendarDaysIcon className="w-5 h-5 text-mono_400" />
            }
            type="date"
            value={startDate}
            variant="bordered"
            onChange={(e) => setStartDate(e.target.value)}
          />

          {formattedStart && formattedEnd && (
            <div className="text-sm text-mono_600">
              {formattedStart} ~ {formattedEnd}
            </div>
          )}

          {remainingPoint !== null && (
            <div className="text-sm text-mono_500">
              보유 포인트:{' '}
              <span className="font-semibold text-mono_800">
                {remainingPoint.toLocaleString()}p
              </span>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            fullWidth
            className="text-sm font-semibold"
            color="primary"
            isDisabled={!startDate || !selectedProduct || !isAvailable}
            radius="full"
            onClick={handlePurchase}
          >
            총 {selectedProduct?.gymProductFee.toLocaleString()} p 결제
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
