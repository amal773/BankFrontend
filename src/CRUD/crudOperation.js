import React, { useState, useEffect } from "react";
import axios from "axios";

function CrudOperation() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  const [custs, setCusts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ssn, setSsn] = useState("");
  const [editingCust, setEditingCust] = useState(null);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8881/getallcustomers")
      .then((response) => {
        setCusts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers!", error);
      });
  }, [custs]);

  // Create a new post
  const createCust = () => {
    axios
      .post("http://localhost:8881/addcustomer", {
        name,
        address,
        email,
        age,
        phone,
        username,
        password,
        ssn,
      })
      .then((response) => {
        setCusts([...posts, response.data]);
        setAddress("");
        setAge(0);
        setEmail("");
        setName("");
        setPassword("");
        setPhone("");
        setSsn("");
        setUsername("");
      })
      .catch((error) => {
        console.error("There was an error creating the customer!", error);
      });
  };

  // Update a post
  const updatePost = (post) => {
    axios
      .put(`http://localhost:8881/updatecustomer/${post.id}`, post)
      .then((response) => {
        setPosts(custs.map((c) => (c.id === custs.id ? response.data : c)));
        setEditingCust(null);
        setAddress("");
        setAge(0);
        setEmail("");
        setName("");
        setPassword("");
        setPhone("");
        setSsn("");
        setUsername("");
      })
      .catch((error) => {
        console.error("There was an error updating the customer!", error);
      });
  };

  // Delete a post
  const deleteCust = (id) => {
    axios
      .delete(`http://localhost:8881/deletecustomer/${id}`)
      .then(() => {
        setCusts(custs.filter((cust) => cust.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the customer!", error);
      });
  };

  const validate = () => {
    const newError = {};
    if (!name) newError.name = "Name is required";
    if (!username) newError.username = "Username is required";
    if (!address) newError.address = "Address is required";
    
    if (!age) newError.age = "Age is required";

    if (!ssn) newError.ssn = "SSN is required";
    else if (!/^\d{9}$/.test(ssn)) {
      newError.ssn = "Email address is invalid (must be 9 digits)";
    }
    if (!email) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Email address is invalid";
    }
    if (!phone) {
      newError.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newError.phone = "Phone number is invalid (must be 10 digits)";
    }

// At least one lowercase alphabet i.e. [a-z]
// At least one uppercase alphabet i.e. [A-Z]
// At least one Numeric digit i.e. [0-9]
// At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
// Also, the total length must be in the range [8-15]
    if (!password) newError.password = "Password is required";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password)) {
      newError.password = "Password is invalid";
    }

    return newError; // Return true if no errors
  };

  const handleEditClick = (cust) => {
    setEditingCust(cust);
    setName(cust.name);
    setAddress(cust.address);
    setEmail(cust.email);
    setAge(cust.age);
    setPhone(cust.phone);
  };

  const handleSaveClick = () => {
    if (editingCust) {
      updatePost({ ...editingCust, name, address, email, age, phone });
    } else {
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        createCust();
      }
    }

    // if(validate()){
    //   if (editingCust) {
    //     updatePost({ ...editingCust, name, address, email, age, phone });
    //   } else {
    //     createCust();
    //   }
    // }
  };

  return (
    <div className="my-3">
      {/* <h1>Bank App</h1> */}
      <div class="mx-5">
        {editingCust ? (
          <div id="edit">
            <h2>Edit customer</h2>
            <input
              class="form-control my-3"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* {errors.name && <p>{errors.name}</p>} */}
            <input
              class="form-control my-3"
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              class="form-control my-3"
              type="text"
              placeholder="age"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
            <input
              class="form-control my-3"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              class="form-control my-3"
              type="text"
              placeholder="phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <a href=""></a>
            <button class="btn btn-secondary my-3" onClick={handleSaveClick}>
              Update Customer
            </button>
          </div>
        ) : (
          <>
            <h2>Add customer</h2>
            <input
              class="form-control my-3"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="alert-danger">{errors.name}</p>}
            <input
              class="form-control my-3"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="alert-danger">{errors.username}</p>}
            <input
              class="form-control my-3"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="alert-danger">{errors.password}</p>}
            <input
              class="form-control my-3"
              type="text"
              placeholder="ssn"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
            />
            {errors.ssn && <p className="alert-danger">{errors.ssn}</p>}
            <input
              class="form-control my-3"
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="alert-danger">{errors.address}</p>}
            <input
              class="form-control my-3"
              type="text"
              placeholder="age"
              // value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
            {errors.age && <p className="alert-danger">{errors.age}</p>}
            <input
              class="form-control my-3"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="alert-danger">{errors.email}</p>}
            <input
              class="form-control my-3"
              type="text"
              placeholder="phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="alert-danger">{errors.phone}</p>}
            <button class="btn btn-secondary my-3" onClick={handleSaveClick}>
              Add Customer
            </button>
          </>
        )}
      </div>
      <ul class="list-group">
        {custs.map((cust) => (
          <li key={cust.id}>
            <div class="card m-3">
              <div class="card-header">
                <h2>{cust.name}</h2>
              </div>
              <div class="card-body">
                <h5 class="card-text">{cust.email}</h5>
                <h5 class="card-text">+91 {cust.phone}</h5>
                <a href="#edit">
                  {" "}
                  <button
                    class="btn btn-primary mx-2"
                    onClick={() => handleEditClick(cust)}
                  >
                    Edit
                  </button>
                </a>
                <button
                  class="btn btn-danger m-2"
                  onClick={() => deleteCust(cust.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudOperation;
