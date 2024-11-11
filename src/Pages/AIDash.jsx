import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AIDash = () => {

    const[theme,setTheme]=useState(false);

    const[searchbox,setSearchbox]=useState();
    
    const[datafound,setDatafound]=useState(false)

    const [aidata,setAidata]=useState()

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


    const favourite = () => {
       
        let existingFavs = localStorage.getItem("favdata");
        let favArray = existingFavs ? JSON.parse(existingFavs) : [];
    
      
        const isAlreadyFav = favArray.some(fav => fav.aidata.id === aidata.id);
    
        if (!isAlreadyFav) {

            favArray.push(aidata);
    
            localStorage.setItem("favdata", JSON.stringify(favArray));
    
            console.log("Receipe data added to favorites:", aidata);
        } else {
            console.log("Receipe data is already in favorites.");
        }
    }


    const searchsubmit=async(e)=>{
        e.preventDefault()

        const input = [
            { "dietType": dietType },
            { "cuisine": cuisine },
            { "ingredients": ingredients },
            { "allergies": allergies },
            { "servings": servings },
            { "cookingTime": cookingTime },
            { "skillLevel": skillLevel },
            { "mealType": mealType }
        ];

 
        
        try {
            const senddata=await axios.post("https://aireceipe-backend.onrender.com/chat",input)
            .then(res=>setDatafound(res.data))
            
        } catch (error) {
            console.log(error);        
        }

               
    }

    return (
        <>
                <div>
            <div className='totalcontent'>
            <div className='body_dash'>

                <div className='heading'>
                    <div >

                    <h1 >AI Recipe Maker</h1>
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

<form className='searchform m-4 d-flex flex-column gap-4' onSubmit={searchsubmit}>
    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Diet Type</label>
        <input type="text" className='searchbox' placeholder='E.g., Vegetarian, Vegan, Keto...' onChange={e => setDietType(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Cuisine</label>
        <input type="text" className='searchbox' placeholder='E.g., Italian, Mexican, Indian...' onChange={e => setCuisine(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Ingredients</label>
        <input type="text" className='searchbox' placeholder='E.g., Chicken, Tomatoes, Basil...' onChange={e => setIngredients(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Allergies/Restrictions</label>
        <input type="text" className='searchbox' placeholder='E.g., Nuts, Dairy, Gluten...' onChange={e => setAllergies(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Servings</label>
        <input type="number" className='searchbox' placeholder='E.g., 2, 4, 6...' onChange={e => setServings(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Cooking Time (minutes)</label>
        <input type="number" className='searchbox' placeholder='E.g., 30, 60, 90...' onChange={e => setCookingTime(e.target.value)} />
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Skill Level</label>
        <select className='searchbox long' onChange={e => setSkillLevel(e.target.value)}>
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
        </select>
    </div>

    <div className='form_sections d-flex flex-column'>
        <label className='form_labels d-flex justify-content-center align-items-center py-3 white'>Meal Type</label>
        <select className='searchbox long' onChange={e => setMealType(e.target.value)}>
            <option value="">Select Meal Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
        </select>
    </div>

    <button type='submit' className='btn btn-primary search-btn'>Search</button>
</form>


                    </div>


                  { datafound? <div  className='dishes'>
                  

                            <div className='date_time d-flex justify-content-center align-items-center white'>
                                <div>
                                    <button className='btn btn-primary' onClick={favourite}>Add To Fav</button>
                                </div>
                            </div>

                 

                    </div>:<div className='welcome d-flex justify-content-center align-items-center'>Search And Get Your Receipe</div>}
            </div>
            </div>
         </div>
        </>
    );
};

export default AIDash;