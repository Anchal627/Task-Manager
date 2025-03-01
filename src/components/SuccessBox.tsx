import { useNavigate } from "react-router-dom";
const SuccessBox: React.FC<{ message: string; onBack: () => void }> = ({
  onBack,
  message,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-[315px] h-[227px] rounded-[30px] bg-white shadow-[1px_2px_6px_0px_rgba(0,110,233,0.3)] flex flex-col items-center gap-[10px] p-4">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M67.7758 37.1513L67.7757 37.1513C69.3781 38.8008 69.3853 41.4052 67.7706 43.0199L47.979 62.8116C47.1677 63.6229 46.1195 63.9997 45.0421 63.9997C44.0036 63.9997 42.9568 63.6211 42.1476 62.8123L67.7758 37.1513ZM67.7758 37.1513L67.7706 37.1461C66.1587 35.5342 63.5088 35.5342 61.8969 37.1461L45.0421 54.0009L38.104 47.0628C36.492 45.4509 33.8421 45.4509 32.2302 47.0628C30.6155 48.6775 30.6227 51.2819 32.2251 52.9314L32.2251 52.9315L32.2309 52.9373L42.1469 62.8116L67.7758 37.1513ZM68.0837 8.83301C75.0248 8.83301 80.7848 11.2667 84.8108 15.4805C88.8386 19.6963 91.1671 25.7325 91.1671 32.9997V67.0455C91.1671 74.2895 88.8389 80.3141 84.811 84.5244C80.785 88.7327 75.0248 91.1664 68.0837 91.1664H31.9587C25.0176 91.1664 19.2467 88.7326 15.2102 84.5239C11.172 80.3135 8.83374 74.2888 8.83374 67.0455V32.9997C8.83374 25.7331 11.1722 19.697 15.2105 15.481C19.2469 11.2668 25.0176 8.83301 31.9587 8.83301H68.0837Z"
          fill="black"
          stroke="black"
        />
      </svg>
      <p className="w-[223px] h-[44px]  font-[Poppins] font-medium text-[16px] leading-[22.4px] tracking-[0%] text-center text-black">
        {message}
      </p>
      <button
        onClick={onBack}
        className="w-[271px] h-[48px] rounded-[10px]  border border-solid  border-[rgba(0,110,233,1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-black text-white font-[Poppins]"
      >
        Back
      </button>
    </div>
  );
};
export default SuccessBox;
