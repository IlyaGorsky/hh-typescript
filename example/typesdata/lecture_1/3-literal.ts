// Литеральные типы были созданы для того, чтобы на этапе компиляции выявлять
// ошибки, возникающие из-за несоответствия значений заранее объявленных констант,
// как, например, номер порта или идентификатор динамического типа.

/**
 * Примитивные литеральные типы Number, String, Template String, Boolean
 */
{

    /**
     * Логический литеральный тип
     * 
     * @name Boolean
     */
    function required(flag: true | false) { }
    required(true)
    required(false)
    // required(1)
    // required("false")

    /**
     * Строковые литеральный тип
     *
     * @name String
     * @description п
     */
    function animate(easing: "in" | "out" | "easeInOut" | "lienar") { }

    // animate("in")
    // animate("ease")


    /**
     * Числовые литеральный тип
     * 
     * @name Number
     */
    {
        const port80: number = 80;
        const port42: number = 42;

        // параметры ограничены лишь типом данных
        const start = (port: number): void => {
            // блок if сообщит об ошибке только во время выполнения
            if (port !== port80 || port !== port42) {
                throw new Error(`port #${port} is not valid.`);
            }
        }
        start(81); // вызов с неправильным значением
    }

    {
    
        type ValidPortValue = 80 | 42;
        const port80: number = 80;
        const port42: number = 42;
    
        const start = (port: ValidPortValue): void => {
            // блок if сообщит об ошибке только во время выполнения
            if (port !== port80 || port !== port42) {
                throw new Error(`port #${port} is not valid.`);
            }
        }
        // start(81);
        // start(80)
    }

        
    /**
     * Шаблонный литеральный тип String
     * @name Template String
     */
    type AxisX = "top" | "bottom";
    type AxisY = "left" | "right";
    /**
     * type Sides = "top-left" | "top-right" | "bottom-left" | "bottomright"
     */
    type Sides = `${AxisX}-${AxisY}`;

    /**
     * type BorderRadius = "border-top-left-radius" | "border-top-rightradius" | "border-bottom-left-radius" | "border-bottom-right-radius"
     */
    type BorderRadius = `border-${Sides}-radius`;

}