const ranges = [...document.querySelectorAll('.points')];
const totalPointsEl = document.getElementById('points-to-give');
const resetPointsBtn = document.getElementById('reset-points-btn');
const submitBtn = document.getElementById('submit-btn');
const nameInput = document.getElementById('name');
const errorEl = document.getElementById('error-message');
const formEl = document.querySelector('form');

const MAX_POINTS = 10;

formEl.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        errorEl.textContent = '';

        if (!nameInput.value) {
            errorEl.textContent = 'Bez imienia cię nie przepuścimy!';
        } else if (nameInput.value.length < 3) {
            errorEl.textContent = 'Imię wojownika musi być dłuższe niż 2 znaki';
        } else {
            const obj = {
                name: nameInput.value,
                stats: {
                    power: +ranges[0].value,
                    defense: +ranges[1].value,
                    durability: +ranges[2].value,
                    agility: +ranges[3].value,
                },
            };

            const res = await fetch('/warrior', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            const warriorName = await res.json();
            alert(`Gratulacje stworzyłeś swojego wojownika o imieniu ${warriorName}! Pora wrócić na rynek.`);
            window.location.reload(true);
        }
    } catch (err) {
        console.log(err);
    }
});

const activateSubmitBtn = value => submitBtn.disabled = value;

const countPoints = () => {
    const points = [];
    ranges.forEach(range => {
       points.push(Number(range.value));
    });
    return points.reduce((prev, curr) => prev + curr, 0);
};

const showPoints = (range, e) => {
    const span = document.getElementById(`${e.target.id}-value`);

    if (span) span.remove();

    const currValue = document.createElement('span');
    currValue.id = `${e.target.id}-value`;
    currValue.textContent = range.value;

    range.parentNode.appendChild(currValue);
};


ranges.forEach(range => {
    range.addEventListener('input', e => {
        showPoints(range, e);

        const totalPoints = countPoints();

        totalPointsEl.innerText = MAX_POINTS - totalPoints + '';
        if (MAX_POINTS - totalPoints === 0) {
            totalPointsEl.innerText = '0';
            ranges.forEach(r => r.disabled = true);
            activateSubmitBtn(false);
        } else if (MAX_POINTS - totalPoints < 0) {
            activateSubmitBtn(true);
            totalPointsEl.innerText = `Limit 10 punktów! Ponad ${Math.abs(MAX_POINTS - totalPoints)}`;
        }
    });
});

resetPointsBtn.addEventListener('click', () => document.location.reload(true));