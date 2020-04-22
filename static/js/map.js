let infobox = document.getElementById('info-box');
let prev = 'Jason';
document.querySelector('#map').childNodes.forEach(elem => {
    elem.addEventListener('mouseover', function () {
        if(prev == this.getAttribute('title')) return;
        console.log(this.getAttribute('title'));
        fetch(
            `https://covid-193.p.rapidapi.com/statistics?country=${this.getAttribute(
                'title'
            ).replace(/\s/g, '-')}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
                    'x-rapidapi-key':
                        '3c87e0959dmsh7d0595f6de9fddbp11380ajsn1fdcca18da12',
                },
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let response = data.response[0];
                text = `${this.getAttribute('title')}
                    <br> Cases: 
                    ${response.cases.active}
                    <br> Deaths: 
                    ${response.deaths.total}
                    <br> Recovered: 
                    ${response.cases.recovered}`;
                infobox.style.display = 'block';
                infobox.innerHTML = text;
                prev = this.getAttribute('title');
            })
            .catch(err => {
                console.log(err);
            });
    });

    elem.addEventListener('mouseleave', e => {
        infobox.style.display = 'none';
        prev = '';
    });
});

document.addEventListener('mousemove', e => {
    infobox.style.top = `${e.pageY  - 10}px`;
    infobox.style.left = `${e.pageX + 20}px`;
});
