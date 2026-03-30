import { useState } from "react";
import { Eye } from "lucide-react";
export const ControlInput = () => {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [bgcolor, setBgcolor] = useState("white");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleToggle = () => {
    setShow(!show);
  };
  const handleChecked = () => {
    setChecked(!checked);
  };
  const handleColor = () => {
    setBgcolor(bgcolor === "white" ? "lightblue" : "white");
  };
  return (
    <>
      <h1>
        Display input text as user types (controlled input) and Create a
        character counter for input field.
      </h1>
      <div>
        <label>Enter the Text: </label>
        <input type="text" placeholder="Type here..." onChange={handleChange} />
      </div>
      <p>Text: {text}</p>
      <p>Character Count: {text.length}</p>
      <h1>Toggle text visibility using a button.</h1>
      <button onClick={handleToggle}>Toggle</button>
      {show && <p>This text is toggled by the button </p>}

      <div>
        <h1> Create a checkbox that shows 'Checked' / 'Unchecked' </h1>
        <input type="checkbox" onChange={handleChecked} />
        {checked ? <p>Checked</p> : <p>Unchecked</p>}
      </div>
      <div>
        <h1>Change background color on button click</h1>
        <button onClick={handleColor}>Color</button>
      </div>
      <div>
        <h1>Form</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            name="name"
            onChange={handleChangeData}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            name="email"
            onChange={handleChangeData}
          />
          <br />
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            name="password"
            onChange={handleChangeData}
          />
          <Eye onClick={() => setShowPassword(!showPassword)} />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};
