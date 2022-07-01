const btnClick = (id) => {
    const images = document.getElementById('images');
    const text = document.getElementById('nekrolog');
    const coordinates = document.getElementById('coordinates');
    
    [images, text, coordinates]
        .forEach((el, i) => {
            if (i === id) {
                i === 0 ? el.style.display = 'grid' : el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });
}