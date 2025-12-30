'use client'

import styles from "./main.module.css";
import { useState } from "react";

export default function MainCard(){
    const [formData, setFormData] = useState({
        cement: "",
        slag: "",
        fly_ash: "",
        water: "",
        superplasticizer: "",
        coarse_aggregate: "",
        fine_aggregate: "",
        age: "",
    });

    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const response = await fetch("https://concrete-model-api.onrender.com/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cement: parseFloat(formData.cement),
                    slag: parseFloat(formData.slag),
                    fly_ash: parseFloat(formData.fly_ash),
                    water: parseFloat(formData.water),
                    superplasticizer: parseFloat(formData.superplasticizer),
                    coarse_aggregate: parseFloat(formData.coarse_aggregate),
                    fine_aggregate: parseFloat(formData.fine_aggregate),
                    age: parseFloat(formData.age),
                }),
            });

            if (!response.ok) throw new Error("Erreur lors de la prédiction");

            const data = await response.json();
            setPrediction(data.prediction);
        } catch (err) {
            setError("Impossible de contacter l'API. Vérifiez que le service Render est actif.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
                                name="fly_ash" 
                                value={formData.fly_ash}
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
                                name="coarse_aggregate"
                                value={formData.coarse_aggregate}
                                onChange={(e)=>handleChange(e)}
                                placeholder="Ex: 1040"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="fineAggregate">Fine Aggregate</label>
                            <input 
                                id="fineAggregate" 
                                type="number"
                                name="fine_aggregate"
                                value={formData.fine_aggregate}
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

                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? "Loading... this might take a while at the first prediction" : "Predict Concrete Strength"}
                    </button>
                </form>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <div className={styles.footer}>
                    <div>
                        <p>Score R2</p>
                        <h3>0.94</h3>
                    </div>

                    <div>
                        <p>Etudiant</p>
                        <h3 className={styles.nom}>Indel Lyes</h3>
                    </div>

                    <div>
                        <p>Groupe</p>
                        <h3>ISII - G3</h3>
                    </div>
                </div>
            </div>

            {/* L'OVERLAY EST MAINTENANT EN DEHORS DU MAINCARD */}
            {prediction !== null && (
                <div className={styles.resultOverlay} onClick={() => setPrediction(null)}>
                    <div className={styles.resultContainer} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.resultTitle}>Résistance Prédite</h3>
                        <div className={styles.resultBadge}>
                            <span className={styles.resultValue}>{prediction.toFixed(2)}</span>
                            <span className={styles.resultUnit}>MPa</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}