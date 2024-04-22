import { useNavigate } from "react-router-dom";

let BackButton = () => {
  let navigate = useNavigate();
  let handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <button onClick={handleBack} className="back_button">
        ← Back to homes
      </button>
    </>
  );
};

export default BackButton;
