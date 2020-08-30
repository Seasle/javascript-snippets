class Curve {
    /**
     * Создает кривую Безье из заданных точек
     * @param {{ x: number, y: number }[]} points Массив точек
     * @param {number} tension Плавность перехода между точками
     */
    constructor(points, tension = 0.5) {
        this.points = points;
        this.positions = [];
        this.tension = tension;
        this.path = new Path2D();

        this.calculatePositions();
        this.createPath();
    }

    /**
     * Вычисляет расстояние между двумя точками
     * @param {{ x: number, y: number }} pointA Точка А
     * @param {{ x: number, y: number }} pointB Точка Б
     * @return {number} Расстояние между двумя точками
     */
    distantionBetweenPoints(pointA, pointB) {
        return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
    }

    /**
     * Создает массив точек для одного промежутка
     * @param {{ x: number, y: number }} pointA Точка А
     * @param {{ x: number, y: number }} pointB Точка Б
     * @param {{ x: number, y: number }} pointC Точка В
     * @return {{ x: number, y: number }[]} Массив из двух точек для одного промежутка
     */
    intermediatePoints(pointA, pointB, pointC) {
        if (!pointA || !pointB || !pointC) {
            return null;
        }

        const point = {
            x: pointC.x - pointA.x,
            y: pointC.y - pointA.y,
        };
        const d1 = this.distantionBetweenPoints(pointA, pointB);
        const d2 = this.distantionBetweenPoints(pointB, pointC);
        const total = d1 + d2;

        return [
            {
                x: pointB.x - (point.x * this.tension * d1) / total,
                y: pointB.y - (point.y * this.tension * d1) / total,
            },
            {
                x: pointB.x + (point.x * this.tension * d2) / total,
                y: pointB.y + (point.y * this.tension * d2) / total,
            },
        ];
    }

    /**
     * Создает массив промежуточных точек, необходимых для построения кривой
     */
    calculatePositions() {
        for (let index = 0; index < this.points.length - 1; index++) {
            const points = this.intermediatePoints(
                this.points[index],
                this.points[index + 1],
                this.points[index + 2]
            );

            if (points) {
                this.positions.push(...points);
            }
        }
    }

    /**
     * Создает путь
     */
    createPath() {
        if (this.points.length === 2) {
            this.path.moveTo(this.points[0].x, this.points[0].y);
            this.path.lineTo(this.points[1].x, this.points[1].y);
        } else {
            this.path.moveTo(this.points[0].x, this.points[0].y);
            this.path.quadraticCurveTo(
                this.positions[0].x,
                this.positions[0].y,
                this.points[1].x,
                this.points[1].y
            );
            for (let index = 2; index < this.points.length - 1; index++) {
                this.path.bezierCurveTo(
                    this.positions[2 * (index - 1) - 1].x,
                    this.positions[2 * (index - 1) - 1].y,
                    this.positions[2 * (index - 1)].x,
                    this.positions[2 * (index - 1)].y,
                    this.points[index].x,
                    this.points[index].y
                );
            }
            this.path.quadraticCurveTo(
                this.positions[this.positions.length - 1].x,
                this.positions[this.positions.length - 1].y,
                this.points[this.points.length - 1].x,
                this.points[this.points.length - 1].y
            );
        }
    }
}
