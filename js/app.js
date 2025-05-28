let btn_left = document.querySelector('.slider__btn_left');
let btn_right = document.querySelector('.slider__btn_right');

let auto_slider = true

let lines = []


let container = document.querySelector('.slider__container');
let slides = document.querySelectorAll('.slider__item');
let step = 0;
let step_click = 0;
let width_slide = slides[0].offsetWidth  + 15

let slideStyle = getComputedStyle(slides[0]);
let slideWidth = slides[0].getBoundingClientRect().width;
let marginRight = parseFloat(slideStyle.marginRight);

let fullSlideWidth = slideWidth + marginRight;

let containerWidth = container.getBoundingClientRect().width;

let slidesVisible = Math.floor(containerWidth / fullSlideWidth);


let step_end = -width_slide * (slides.length - slidesVisible);


// активные слайды

let createLine = () => {
    let block_lines = document.querySelector('.slider_active_lines')
    for (let i = 0; i <= slides.length - slidesVisible ; i++) {
        let line = document.createElement('div');
        line.className = 'slider_line';
        lines.push(line)

        block_lines.appendChild(line);
    }
    lines[0].classList.add('active_line')


}

createLine()

// /активные слайды


btn_left.addEventListener('click', () => {

    if (step < 0) {
        step_click--
        auto_slider = false
        step += width_slide
        container.style.transform = `translateX(${step}px)`
        updateClassLine(step_click)

    }
    else {
        step_click = slides.length - slidesVisible  
        step = step_end
        container.style.transform = `translateX(${step}px)`
        updateClassLine(step_click)

    }

})

btn_right.addEventListener('click', () => {
    if (step != step_end) {
        step_click++

        auto_slider = false
        step -= width_slide
        container.style.transform = `translateX(${step}px)`
        updateClassLine(step_click)


    }
    else {
        step_click = 0
        step = 0
        container.style.transform = `translateX(${step}px)`
        updateClassLine(step_click)
    }

})

console.log(slidesVisible)

let updateClassLine = (step_click) => {
    if (!lines || lines.length === 0) return; // Проверяем, что lines существует и не пустой

    for (let i = 0; i < lines.length; i++) {
        // Проверяем, есть ли класс 'active_line' у текущего элемента, если есть - удаляем
        if (lines[i].classList.contains('active_line')) {
            lines[i].classList.remove('active_line');
        }
        
    }

    // Добавляем класс 'active_line' элементу с индексом step_click, если он существует
    if (lines[step_click]) {
        lines[step_click].classList.add('active_line');
        
    }
    
}

// автопрокрутка
setInterval(() => {
    if (auto_slider == true) {
        if (step != step_end) {
            step_click++

            step -= width_slide
            container.style.transform = `translateX(${step}px)`
            updateClassLine(step_click)


        }
        else {
            step_click = 0
            step = 0
            container.style.transform = `translateX(${step}px)`
            updateClassLine(step_click)
        }
    }

}, 3000)
// /автопрокрутка

