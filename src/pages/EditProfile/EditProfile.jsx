import './EditProfile.css'
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';
import service from "../../services/file-upload.service";
import Loading from "../../components/Loading/Loading";


function EditProfile() {
  const [userPut, setUserPut] = useState('')
  const [location, setLocation] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  let [skills, setSkills] = useState([])
  const [description, setDescription] = useState('')
  const [helpImageUrl, setHelpImageUrl] = useState("");
  const [loading, setLoading] = useState(true)
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
  const userIdFromAuth = user._id
  const navigate = useNavigate()

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);

    const uploadData = new FormData();

    uploadData.append('profilePicture', e.target.files[0]);

    console.log("UploadData", uploadData);
    service
      .uploadImageProfile(uploadData)
      .then(response => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setProfilePicture(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };


  useEffect(() => {
    fetch(`${BACKEND_ROOT}/user/${userIdFromAuth}`)
      .then((response) => {
        console.log(userIdFromAuth)
        return response.json();
      })
      .then((responsejson) => {
        setLocation(responsejson.location)
        setProfilePicture(responsejson.profilePicture)
        setSkills(responsejson.skills)
        setDescription(responsejson.description)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleSkillsChange = (event) => {
    if (event.target.checked) {
      setSkills(prevSkills => [...prevSkills, event.target.value]);
    } else {
      setSkills(prevSkills => prevSkills.filter(skill => skill !== event.target.value));
    }
  };

  const putData = (event) => {
    event.preventDefault();
    const skillsArray = typeof skills === 'string' ? [skills] : skills;
    const updatedUser = {
      location,
      profilePicture,
      skills: skillsArray,
      description,
      id: user._id
    };
    setUserPut(updatedUser)
    console.log(updatedUser)

    fetch(`${BACKEND_ROOT}/user/edituser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),

    }, { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((editedUser) => {
        setUserPut(editedUser)
        console.log(editedUser)
        navigate("/myprofile")
      })
      .catch((err) => (console.log(err)));
  }



  return (
    <>
    {userIdFromAuth ?
    <div>
      <form encType="multipart/form-data" onSubmit={(event) => putData(event)}>
      <h1>Edit my profile</h1>
        <div className='edit-profile-container'>
          <label htmlFor="location">Location: </label>
          <textarea type="textarea" name="location" id='location' value={location} onChange={(event) => setLocation(event.target.value)} />
          <br />
          <label htmlFor="profilePicture" className="fileInputLabel">Profile Picture: </label>
          <input type="file" accept="image/*" className="image-input"

            onChange={(event) => handleFileUpload(event)}
            name="profilePicture"
            id="profilePicture" />
          {profilePicture && <img className="img-preview" src={profilePicture} alt="User Profile Image" />}
          <br />
          <label htmlFor="skills" className='custom-select'  >Skills: </label>
          <div id='skills'>
            <label><input onChange={handleSkillsChange} checked={skills.includes('Languages')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Languages" /> <span className="checkboxLabel">Languages</span></label><br />
            <label><input onChange={handleSkillsChange} checked={skills.includes('Tech')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Tech" /> <span className="checkboxLabel">Tech</span></label><br />
            <label><input onChange={handleSkillsChange} checked={skills.includes('Strength')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Strength" />  <span className="checkboxLabel">Strength</span></label><br />
            <label><input onChange={handleSkillsChange} checked={skills.includes('Dancing')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Dancing" />  <span className="checkboxLabel">Dancing</span></label><br />
            <label><input onChange={handleSkillsChange} checked={skills.includes('Active listening')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Active listening" /> <span className="checkboxLabel">Active listening</span> </label><br />
            <label><input onChange={handleSkillsChange} checked={skills.includes('Body disciplines')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Body disciplines" /> <span className="checkboxLabel">Body disciplines</span></label><br />
            <label><input onChange={handleSkillsChange} checked={skills.includes('Coaching')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Coaching" />  <span className="checkboxLabel">Coaching</span> </label><br />
            <label><input onChange={handleSkillsChange} checked={skills.includes('Humor')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Humor" />  <span className="checkboxLabel">Humor</span></label><br />
            <label><input onChange={handleSkillsChange} checked={skills.includes('Sports')}  type="checkbox" className="hiddenCheckbox" name="skills" value="Sports" />  <span className="checkboxLabel">Sports</span></label><br />
          </div>
          <br />
          <label htmlFor="description">Description: </label>
          <textarea type="textarea" name="description" id='description' value={description} onChange={(event) => setDescription(event.target.value)} />
          <br />
          <button className='edit-send' type="submit">Send</button>
        </div>
      </form>
    </div >
    : <Loading />}
    </>
  );
}

export default EditProfile;