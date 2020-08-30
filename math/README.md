# Links

-   [Math](#math)
    -   [clamp](#clamp)
    -   [normalize](#normalize)
    -   [lerp](#lerp)
    -   [floor](#floor)
    -   [ceil](#ceil)
    -   [round](#round)
    -   [random](#random)
-   [Digital Unit](#digital-unit)

## Math

### clamp

```JavaScript
clamp(-10, 10, 20); // 10
clamp(-10, 10, -20); // -10
clamp(-10, 10, 0); // 0
```

### normalize

```JavaScript
normalize(0, 100, 50); // 0.5
normalize(-20, 100, 20); // 0.33
```

### lerp

```JavaScript
lerp(-100, 100, 0.25); // -50
lerp(-100, 100, 0.75); // 50
```

### floor

```JavaScript
floor(Math.PI); // 3
floor(Math.PI, 5); // 3.14159
```

### ceil

```JavaScript
ceil(Math.PI); // 4
ceil(Math.PI, 5); // 3.1416
```

### round

```JavaScript
round(Math.E); // 3
round(Math.E, 2); // 2.72
round(Math.E, 3); // 2.718
```

### random

```JavaScript
random(1, 5); // 2 [1..5]
```

## Digital Unit

```JavaScript
Unit.MB(1); // 1_000_000
Unit.MiB(1); // 1_048_576
Unit.MB(1) === Unit.KB(1000); // true
```
