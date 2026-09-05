# Colectiva Perú

Quiero crear un prototipo VISUAL (no funcional) para una demo de hackathon. 

NO conectes base de datos real ni backend — usa datos mock/hardcodeados en 

el código. El objetivo es que se vea pulido, profesional y navegable, no 

que procese datos reales.

CONTEXTO DEL NEGOCIO:

Es un marketplace B2B de compras colectivas de materias primas para MYPE 

(pequeñas y medianas empresas) peruanas. Conecta pequeños negocios como 

panaderías, pastelerías, restaurantes y cafeterías con proveedores 

mayoristas. La plataforma permite que varias MYPE unan sus pedidos para 

alcanzar cantidades mínimas de compra y acceder a precios de mayoreo. 

Ejemplo: si un proveedor vende harina desde 100 sacos a precio mayorista, 

varias panaderías juntan sus pedidos individuales hasta llegar a esa 

cantidad y todas acceden al mejor precio.

USUARIOS:

- MYPE compradoras: panaderías, pastelerías, restaurantes, cafeterías, 

  bodegas.

- Proveedores: distribuidores que venden al por mayor y buscan agregar 

  demanda de muchos pequeños compradores.

- Administrador: gestiona la plataforma (vista simple, no prioritaria en 

  esta demo).

PANTALLAS A INCLUIR (con navegación entre ellas):

1. Landing Page

   Explica el problema y cómo funciona la compra colectiva. Debe mostrar 

   ejemplos de campañas activas y el beneficio de ahorro para las MYPE. 

   Call to action claro para "Empezar a comprar" o "Ver campañas".

2. Dashboard del comprador

   Vista general con: campañas activas en las que participa, campañas 

   disponibles para unirse, próximos pedidos, y el ahorro total acumulado 

   (usar tarjetas de métricas destacadas).

3. Catálogo

   Grid de productos con filtros por categoría, producto, precio, 

   proveedor, ubicación y cantidad mínima. Cada producto en tarjeta con 

   imagen, nombre, proveedor y precio de referencia.

4. Detalle del producto

   Info del producto y proveedor, tabla de precios escalonados por volumen, 

   y las campañas colectivas disponibles para ese producto. El usuario 

   puede indicar cuánto necesita y unirse a una compra colectiva.

5. Campaña colectiva (PANTALLA MÁS IMPORTANTE)

   Debe mostrar visualmente, con una barra de progreso grande y clara:

   - Cuánto volumen se ha reunido vs el objetivo (ej: "82 / 100 unidades 

     comprometidas — Faltan 18 unidades")

   - Cómo cambia el precio al alcanzar distintos umbrales de volumen 

     (tabla o gráfico de precios escalonados)

   - Lista de MYPE participantes (nombres, cantidad aportada)

   - Cuánto está ahorrando cada negocio frente a su precio habitual

   - Botón para unirse a la campaña con un selector de cantidad

6. Checkout y pedidos

   Confirmación de cantidad, precio aplicado, costos de entrega y total. 

   Luego una vista de "Mis pedidos" con estado (pendiente, confirmado, 

   en camino, entregado).

7. Dashboard del proveedor

   Publicar productos, definir precios por volumen, crear campañas y ver 

   cuánta demanda se está agregando por campaña (con la misma lógica 

   visual de barra de progreso).

FUNCIONALIDADES SECUNDARIAS A REFLEJAR VISUALMENTE (aunque sea con mock 

data estático, no necesitan lógica real):

- Registro/login de MYPE y proveedores (pantallas simples)

- Historial de compras

- Notificaciones sobre campañas (ícono con badge, panel simple)

- Productos y compras frecuentes

- Solicitud de productos no disponibles (formulario simple)

- Recomendaciones de campañas según necesidades habituales

- Calificaciones básicas de proveedores (estrellas)

- Panel administrativo simple (lista de campañas, usuarios, métricas 

  generales)

ESTILO VISUAL:

Diseño moderno, limpio y profesional, inspirado en marketplaces B2B y 

plataformas fintech. Usa tarjetas de productos, dashboards con métricas, 

y barras de progreso como elemento visual central para mostrar ahorro y 

avance de compras colectivas. Debe transmitir confianza, ahorro y 

eficiencia — evita que se vea excesivamente corporativo o frío. Paleta 

de colores que sugiera crecimiento/ahorro (verdes, azules) con acentos 

cálidos.

DATOS DE DEMOSTRACIÓN (usar en todo el prototipo):

- Ubicación: Arequipa, Perú. Precios en soles (S/).

- MYPE de ejemplo: Pastelería Dulce Sur, Panadería Arequipeña, 

  Cafetería Misti

- Proveedor de ejemplo: Distribuidora Andina

- Productos: harina, azúcar, chocolate, mantequilla/margarina, aceite

- Crea 2-3 campañas activas con distintos niveles de avance (una casi 

  completa ~85%, una a la mitad ~50%, una recién iniciada ~20%) para que 

  la demo se vea dinámica.

No necesito por ahora: pagos reales, integración con pasarelas, chat 

en tiempo real, ni lógica de backend — todo debe funcionar con datos 

mock y navegación simulada entre pantallas

Que sea WEB APP RESPONSIVE, idealmente para celular. Utiliza esta plantilla de referencia para el diseño

**Live app**: https://colectiva-ahorro-peru.lovable.app

## Contributors:

- Pochano Valdivia
- Chu chu Pamela
- Mili
- Diana

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
