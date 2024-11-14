import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AIDash = () => {

    const[theme,setTheme]=useState(false);

    const[searchbox,setSearchbox]=useState();
    
    const[datafound,setDatafound]=useState("")

    const [aidata,setAidata]=useState()

    const[editmodel,setEditmodel]=useState(false)

    const [render,setRender] =useState(false)

    const[prereceipe,setPrereceipe]=useState("")

    const [selectedForm, setSelectedForm] = useState(null);

    // ! Form
    const [dietType, setDietType] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [allergies, setAllergies] = useState('');
    const [servings, setServings] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [mealType, setMealType] = useState('');


    useEffect(()=>{
        const bodyElement = document.body;
        if(theme){
            document.body.style.background= 'linear-gradient(90deg, rgba(15,32,39,1) 0%, rgba(32,58,67,1) 50%, rgba(44,83,100,1) 100%)';
           
        }else{
            document.body.style.background= 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)';
        }
    },[theme])

    
    const favourite = (title) => {
        console.log(title);
        
        if (!title) {
            console.log("No title found to add to favorites.");
            return;
        }
            
        const timestamp = new Date().toISOString().split('T')[0];    
    
        let existingFavs = localStorage.getItem("receipedata");
        let favArray = existingFavs ? JSON.parse(existingFavs) : [];
        
        console.log(favArray[0]);
    
        const isAlreadyFav = favArray.some(fav => fav.title === title);
    
        if (!isAlreadyFav) {
            favArray.push({ title, timestamp });
            localStorage.setItem("receipedata", JSON.stringify(favArray));
    
            console.log("Recipe title added to favorites:", title, "at", timestamp);
        } else {
            alert("Recipe title is already in favorites.");
        }
    };
    
    



    const searchsubmit = async (e) => {
        e.preventDefault();
    
        const prompt = {
            dietType,
            cuisine,
            ingredients,
            allergies,
            servings,
            cookingTime,
            skillLevel,
            mealType,
        };
    
        try {
            const response = await axios.post("http://localhost:8000/chat", prompt);
            const responseData = response.data; 
    
            if (typeof responseData.response === 'string') {
                setDatafound(responseData.response);  
                setEditmodel(true)
            } else {
                console.log("Received data is not a string:", responseData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // ! for having receipe
    const searchsubmit2 = async (e) => {
        e.preventDefault();
    
        const prompt ={instructions: `please give me the receipe details depends on this catagory ${prereceipe} `}    
        try {
            const response = await axios.post("http://localhost:8000/chat", prompt);
            const responseData = response.data; 
    
            if (typeof responseData.response === 'string') {
                setDatafound(responseData.response);  
                setEditmodel(true)
            } else {
                console.log("Received data is not a string:", responseData);
            }
        } catch (error) {
            console.log(error);
        }
    };
    

 useEffect(()=>{

 },[editmodel])

 useEffect(()=>{
setRender(false)
 },[render])

 const update=()=>{
setRender(true);
setEditmodel(false)

 }


const clearall = (e) => {
    e.preventDefault(); 
    setDietType("");
    setCuisine("");
    setIngredients("");
    setAllergies("");
    setServings("");
    setCookingTime("");
    setSkillLevel("");
    setMealType("");
    setPrereceipe("")
    setSelectedForm(null);
    setSearchbox(null);
    setRender(true);
  };

const handleSelectForm = (formType) => {
    setSearchbox(formType)
    setSelectedForm(formType);
  };


    return (
        <>
                <div>
            <div className='totalcontent'>
            <div className='body_dash'>

                <div className='heading'>
                    <div >

                    <h1 > AI Culinary Companion </h1>
                    </div>
                </div>
                    <div className='theme '>
                        <div>
                            <label > Theme</label>
                        </div>

                    <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={theme} onChange={e=>setTheme(e.target.checked)}/>
                    </div>
                    </div>
                
                    <nav className='navigates'>
                     <Link to="/" className='headnavs' > Main </Link>
                     <Link to="/dashboard" className='headnavs' > Dashboard </Link>
                     <Link to="/favourites"className='headnavs' > Favourites </Link>
                   
                    </nav>
                    
                    <div className='search'>
                        
                        <div className='2Search_btns'  style={{ display: selectedForm === null ? 'block' : 'none' }}>

                        <div className='optional_search d-flex justify-content-center flex-column align-items-center m-3'>
                            <h3 className='m-4 white'>Select One</h3>
                        <button className='optional_search btn btn-primary w-25' onClick={() => handleSelectForm("havingRecipe")}>Having Receipe</button>
                        </div>
                        <div className='d-flex justify-content-center '>

                        <h4 className='white'>Or</h4>

                        </div>
                        <div className='customize_search d-flex justify-content-center flex-column align-items-center m-3 ' >
                        <button className='optional_search btn btn-primary mb-5' onClick={() => handleSelectForm('customizeRecipe')}>Customize Receipe</button>
                        </div>

                        </div>

                        {searchbox === 'havingRecipe' && ( 
                            <form className="search-bar-form m-4 d-flex justify-content-center align-items-center flex-column gap-4"  style={{ display: selectedForm === "havingRecipe" ? 'block' : 'none' }} onSubmit={searchsubmit2}>
    
      <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Enter the Recipe</label>
        <input type="text" className='searchbox' placeholder='E.g., Biriyani,Noodles...' value={prereceipe} onChange={e => setPrereceipe(e.target.value)} />
    </div>
    
      <button type="submit" className='btn btn-primary search-btn' >Submit</button> 
      <button type='button' className='btn btn-secondary search-btn' onClick={clearall}>Clear</button>

    </form>
 )}
{searchbox === 'customizeRecipe' && (
<form className='searchform m-4 d-flex flex-column gap-4'  style={{ display: selectedForm === "customizeRecipe" ? 'block' : 'none' }} onSubmit={searchsubmit}>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Diet Type</label>
        <input type="text" className='searchbox' placeholder='E.g., Vegetarian, Vegan, Keto...' value={dietType} onChange={e => setDietType(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Cuisine</label>
        <input type="text" className='searchbox' placeholder='E.g., Italian, Mexican, Indian...' value={cuisine} onChange={e => setCuisine(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Ingredients</label>
        <input type="text" className='searchbox' placeholder='E.g., Chicken, Tomatoes, Basil...' value={ingredients} onChange={e => setIngredients(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Allergies/Restrictions</label>
        <input type="text" className='searchbox' placeholder='E.g., Nuts, Dairy, Gluten...' value={allergies} onChange={e => setAllergies(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Servings</label>
        <input type="number" className='searchbox' placeholder='E.g., 2, 4, 6...' value={servings} onChange={e => setServings(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Cooking Time (minutes)</label>
        <input type="number" className='searchbox' placeholder='E.g., 30, 60, 90...' value={cookingTime} onChange={e => setCookingTime(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Skill Level</label>
        <select className='searchbox long'  value={skillLevel} onChange={e => setSkillLevel(e.target.value)}>
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
        </select>
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Meal Type</label>
        <select className='searchbox long' onChange={e => setMealType(e.target.value)}  value={mealType}>
            <option value="">Select Meal Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
        </select>
    </div>

    <button type='submit' className='btn btn-primary search-btn'>Search</button>

    <button type='button' className='btn btn-secondary search-btn' onClick={clearall}>Clear_all</button>
    </form> 
)}

    </div>



{editmodel && (
  <div
    className="modal fade show"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Receipe Info
          </h1>
          <button type="button"
            className="btn btn-primary mx-5"
            onClick={() => favourite(datafound.split('**')[1])}>Add-To-Fav</button>
          <button
            type="button"
            className="btn-close btn btn-danger"
            onClick={() => setEditmodel(false)}
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <form>
          
            <div className="mb-3">
              <h3 htmlFor="recipient-name" className="col-form-label">
                {datafound}
              </h3>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setEditmodel(false)}
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => update()}
          >
           OK !
          </button>
        </div>
      </div>
    </div>
  </div>
)}

            </div>
            </div>
         </div>
        </>
    );
};

export default AIDash;