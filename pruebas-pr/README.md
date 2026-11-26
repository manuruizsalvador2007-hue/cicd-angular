# Cambios para las PR de demostración

Cada bloque es lo que tienes que cambiar en una rama para provocar el fallo.
Después de la captura, deshaz el cambio (o corrígelo) y haz push otra vez.

## 1. Error de compilación (rama feature/error-compilacion)
En `src/app/app.ts`, dentro de la clase `App`, añade:

    protected readonly roto = variableQueNoExiste;

## 2. Test que falla (rama feature/test-falla)
En `src/app/services/task.service.spec.ts`, en el test "empieza sin tareas", cambia
`toBe(0)` por `toBe(1)`.

## 3. Cobertura por debajo del umbral (rama feature/baja-cobertura)
Pega `metodo-sin-test.ts.txt` dentro de la clase `TaskService` (antes de la última `}`).
Resultado esperado en local: líneas al 76 %, y "Coverage for lines (76.19%) does not meet global threshold (80%)".

## 4. Cambio visible (rama feature/cambio-titulo)
En `src/app/app.ts` cambia `title = 'Lista de tareas CI/CD'` por otro texto y actualiza el
texto esperado en `src/app/app.spec.ts`.
