import InputField from '@/app/(main)/login/components/InputField';
import { UserData } from '@/types/UserData'; // UserData 타입 임포트

interface MeasurementInputsProps {
  formData: UserData; // 부모에서 전달받는 formData 타입
  setFormData: React.Dispatch<React.SetStateAction<UserData>>; // setFormData 타입
}

const MeasurementInputs = ({
  formData,
  setFormData,
}: MeasurementInputsProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex gap-[74px] ">
      <InputField
        required
        className="flex-1"
        containerMarginBottom="60px"
        height="40px"
        label="키"
        labelInputGap="5px"
        name="height" // name을 키로 설정
        placeholder="예: 170cm"
        type="text"
        value={formData.height} // 부모에서 받은 값을 설정
        width="234px"
        onChange={handleInputChange} // 입력값 변경 시 상위 상태 업데이트
      />
      <InputField
        required
        className="flex-1"
        containerMarginBottom="60px"
        height="40px"
        label="몸무게"
        labelInputGap="5px"
        name="weight" // name을 몸무게로 설정
        placeholder="예: 60kg"
        type="text"
        value={formData.weight} // 부모에서 받은 값을 설정
        width="141px"
        onChange={handleInputChange} // 입력값 변경 시 상위 상태 업데이트
      />
    </div>
  );
};

export default MeasurementInputs;
