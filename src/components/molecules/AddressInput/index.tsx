import InputField from '@/app/login/components/InputField';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const AddressInput = () => (
  <div className="relative">
    <InputField
      label="도로명 주소"
      name="address"
      placeholder="예: 서울시 강남구 ..."
      required
      width="452px"
      height="40px"
      containerMarginBottom="60px"
      labelInputGap="8px"
    />
    <MagnifyingGlassIcon className="w-[25px] h-[25px] absolute right-3 top-[35px] text-mono_400 cursor-pointer" />
  </div>
);

export default AddressInput;
