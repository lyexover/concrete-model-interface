'use client'

import styles from "./main.module.css";
import { useState } from "react";



export default function MainCard(){

    const [formData, setFormData] = useState({
        cement: '',
        slag: '',
        ash: '',
        water: '',
        superplasticizer: '',
        coarseAggregate: '',
        fineAggregate: '',
        age: ''
    });

    function handleChange(e){
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }


    async function handleSubmit(e){
        e.preventDefault();
        // Here you can handle form submission, e.g., send data to an API
        console.log(formData);
    }


    return (
        <div className={styles.mainCard}>


                <div className={styles.head}>
                    <h1>🏗️ Concrete Strength Predictor</h1>
                    <p>Enter the concrete mix proportions to predict its strength</p>
                </div>



                 <form onSubmit={handleSubmit} className={styles.form}>

                   <div className={styles.formGrid}>
                   <div className={styles.formGroup}>
                        <label htmlFor="cement">Cement (kg/m^3)</label>
                        <input
                         id="cement"
                          type="number" 
                          name="cement" 
                          value={formData.cement}
                          onChange={(e)=>handleChange(e)}
                          placeholder="Ex: 540"
                           />
                   </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="Slag">Blast Furnace Slag (kg/m^3)</label>
                        <input 
                        id="Slag" 
                        type="number" 
                        name="slag" 
                        value={formData.slag}
                        onChange={(e)=>handleChange(e)}
                        placeholder="Ex: 0"
                        />
                   </div>

                     <div className={styles.formGroup}>
                        <label htmlFor="Ash">Fly Ash</label>
                        <input 
                        id="Ash"
                         type="number" 
                         name="ash" 
                         value={formData.ash}
                         onChange={(e)=>handleChange(e)}
                         placeholder="Ex: 0"
                         />
                   </div>

                     <div className={styles.formGroup}>
                        <label htmlFor="water">Water (kg/m^3)</label>
                        <input 
                        id="water"
                         type="number"
                         name="water"
                         value={formData.water}
                         onChange={(e)=>handleChange(e)}
                         placeholder="Ex: 162"
                         />
                   </div>

                        <div className={styles.formGroup}>
                        <label htmlFor="superplasticizer">Superplasticizer</label>
                        <input 
                        id="superplasticizer"
                         type="number"
                         name="superplasticizer"
                         value={formData.superplasticizer}
                         onChange={(e)=>handleChange(e)}
                         placeholder="Ex: 2.5"
                         />
                   </div>
                   
                        <div className={styles.formGroup}>
                        <label htmlFor="coarseAggregate">Coarse Aggregate (kg/m^3)</label>
                        <input 
                        id="coarseAggregate" 
                        type="number"
                        name="coarseAggregate"
                        value={formData.coarseAggregate}
                        onChange={(e)=>handleChange(e)}
                        placeholder="Ex: 1040"
                         />
                   </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="fineAggregate">Fine Aggregate</label>
                        <input 
                        id="fineAggregate" 
                        type="number"
                        name="fineAggregate"
                        value={formData.fineAggregate}
                        onChange={(e)=>handleChange(e)}
                        placeholder="Ex: 676"
                         />
                   </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="age">Age (days)</label>
                        <input
                         id="age"
                          type="number" 
                          name="age"
                          value={formData.age}
                          onChange={(e)=>handleChange(e)}
                          placeholder="Ex: 28"
                          />
                   </div>

                   </div>


                   <button type="submit">Predict Concrete Strength</button>

                 </form>



                 <div className={styles.footer}>
                    <div>
                        <p>Score R2</p>
                        <h3>0.93</h3>
                    </div>

                    <div>
                        <p>Algorithm</p>
                        <h3>ML</h3>
                    </div>

                    <div>
                        <p>Precision</p>
                        <h3>93%</h3>
                    </div>
                 </div>
        </div>
    )
}