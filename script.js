const calculateDowry = () => {
    const name = document.getElementById('name').value;
    let price = Number(document.getElementById('starting-bid').value);

    if (!name || !price) {
        document.getElementById('result').innerText = 'Please fill in all required fields!';
        return;
    }

    const educationCoefficient = Number(document.getElementById('education').value);
    price *= educationCoefficient;

    const networthCoefficient = Number(document.getElementById('networth').value);
    price *= networthCoefficient;

    const casteValue = Number(document.getElementById('caste').value);
    price += casteValue;

    const skills = Array.from(document.querySelectorAll('input[type="checkbox"]:checked:not(.reputation)'));
    price = skills.reduce((total, skill) => total + Number(skill.value), price);

    document.getElementsByName('age').forEach(age => {
        if (age.checked) {
            price *= Number(age.value);
        }
    });

    const repCheckboxes = document.querySelectorAll('input.reputation:checked');
    for (let i = 0; i < repCheckboxes.length; i++) {
        const repValue = Number(repCheckboxes[i].value);
        if (repValue < 0) {
            price += repValue;
        } else {
            price *= repValue;
        }
    }

    const loveLetter = document.getElementById('love-letter').value;

    const person = {
        bride_name: name,
        bride_price: price,
        letter_to_bride: loveLetter
    };

    document.getElementById('result').innerHTML = `Your price for ${person.bride_name} is $${person.bride_price.toFixed(2)}. Your love letter is: "${person.letter_to_bride}"`;
};

document.getElementById('calculate-btn').addEventListener('click', calculateDowry);
