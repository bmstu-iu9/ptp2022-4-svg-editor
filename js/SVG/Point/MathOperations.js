// В MathOperations.js объявлены функции, выполняющие математические операции, которые используются в классе
// Point.js и его наследниках.

// Векторы - объекты, содержащие поля координат x и y

// Поворот точки (x, y) вокруг точки (cx, cy) на угол angle, где angle передаётся в функцию в градусах
function rotate(angle, x, y, cx, cy) {
    angle = angle * Math.PI / 180;

    return {
        x: (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
        y: (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy
    }
}

// Скалярное произвдедение векторов u и v
function scalarProduct(u, v) {
    return u.x * v.x + u.y * v.y;
}

// Модуль вектора u
function modulus(u) {
    return Math.sqrt(Math.pow(u.x, 2) + Math.pow(u.y, 2));
}