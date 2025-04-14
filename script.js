document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultDiv = document.getElementById('result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    
    // Unit buttons
    const weightUnitButtons = document.querySelectorAll('.weight-unit');
    const heightUnitButtons = document.querySelectorAll('.height-unit');
    
    let currentWeightUnit = 'kg';
    let currentHeightUnit = 'cm';
    
    // Set up unit toggle buttons
    weightUnitButtons.forEach(button => {
        button.addEventListener('click', function() {
            weightUnitButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentWeightUnit = this.dataset.unit;
        });
    });
    
    heightUnitButtons.forEach(button => {
        button.addEventListener('click', function() {
            heightUnitButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentHeightUnit = this.dataset.unit;
        });
    });
    
    // Calculate BMI
    calculateBtn.addEventListener('click', function() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        
        if (!weight || !height) {
            alert('Please enter both weight and height');
            return;
        }
        
        let weightInKg = weight;
        let heightInM;
        
        // Convert weight to kg if needed
        if (currentWeightUnit === 'lbs') {
            weightInKg = weight * 0.453592;
        }
        
        // Convert height to meters
        if (currentHeightUnit === 'inches') {
            heightInM = height * 0.0254;
        } else if (currentHeightUnit === 'cm') {
            heightInM = height / 100;
        }
        
        // Calculate BMI
        const bmi = (weightInKg / (heightInM * heightInM)).toFixed(1);
        
        // Determine category
        let category = '';
        const scaleItems = document.querySelectorAll('.scale-item');
        scaleItems.forEach(item => item.classList.remove('active'));
        
        if (bmi < 18.5) {
            category = 'Underweight';
            document.getElementById('underweight').classList.add('active');
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = 'Normal weight';
            document.getElementById('normal').classList.add('active');
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = 'Overweight';
            document.getElementById('overweight').classList.add('active');
        } else {
            category = 'Obese';
            document.getElementById('obese').classList.add('active');
        }
        
        // Display results
        bmiValue.textContent = `Your BMI: ${bmi}`;
        bmiCategory.textContent = `Category: ${category}`;
        resultDiv.style.display = 'block';
    });
    
    // Reset form
    resetBtn.addEventListener('click', function() {
        weightInput.value = '';
        heightInput.value = '';
        resultDiv.style.display = 'none';
        
        // Reset active classes on scale items
        document.querySelectorAll('.scale-item').forEach(item => {
            item.classList.remove('active');
        });
    });
});