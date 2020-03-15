function update() {
    var choice = document.querySelector('input[name=choice]:checked').value;
    var params = {
        choice: choice
    };
    fetch('votingWorker', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            update_total(data);
        });
}

function update_total(data) {
    var span = document.getElementById('result');
    var poll = document.getElementById('poll');
    poll.classList.add('d-none');
    span.innerHTML = JSON.stringify(data);
    showChart(data);
}

function showChart(input) {
    var from = 20;
    var to = 100;
    var stepSize = (to - from) / Object.keys(input).length;
    var colors = [...Array(Object.keys(input).length).keys()].map(
        elem => `hsla(0, 100%, ${from + elem * stepSize}%, .8)`
    );
    results = new Chart($('#results'), {
        type: 'pie',
        data: {
            datasets: [
                {
                    data: Object.values(input),
                    backgroundColor: colors,
                },
            ],
            labels: Object.keys(input).map(
                elem => elem.charAt(0).toUpperCase() + elem.slice(1)
            ),
        },
        options: {
            legend: {
                labels: {
                    fontColor: '#FFFFFF'
                }
            }
        },
    });
}
