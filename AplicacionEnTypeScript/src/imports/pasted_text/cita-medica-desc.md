II.- DESCRIPCION GENERAL
Se tiene estimado que la aplicación del sistema de gestión de citas médicas y arrendamiento de consultorios sea desarrollada utilizando tecnologías que permitan una administración sencilla por parte de los usuarios, incluso para aquellos que no cuentan con conocimientos técnicos avanzados en el uso de sistemas informáticos.
El sistema será diseñado para dispositivos móviles, procurando que la interfaz sea clara, intuitiva y fácil de utilizar para los diferentes tipos de usuarios, como pacientes, doctores, recepcionistas y administradores.
Asimismo, la aplicación buscará ofrecer una experiencia amigable para el usuario final, permitiendo realizar de forma sencilla procesos como el registro de pacientes, el agendamiento de citas médicas, la gestión de expedientes clínicos y la consulta de información relacionada con la atención médica. De esta manera, el sistema pretende facilitar la organización y gestión de los servicios ofrecidos dentro del consultorio.
2.1.- PERSPECTIVA DEL PRODUCTO
El sistema será una aplicación móvil nueva que funcionará como un sistema principal e independiente, aunque podrá integrarse con otros sistemas o servicios externos para complementar su funcionamiento.
Entre estas integraciones se consideran servicios externos de pago electrónico para realizar el anticipo o liquidación de las consultas médicas, así como servicios de notificación mediante SMS o correo para recordar a los pacientes sus citas programadas o informar sobre cambios o cancelaciones. 
2.2.- FUNCIONES DEL PRODUCTO
Modelo de Dominio:
CASOS DE USO
Nombre:	CDU1 – Agendar Cita Paciente.
Actor:	Paciente
Personal Involucrado e intereses:	•	Paciente: Quiere ver la disponibilidad real de horarios, agendar su cita de forma precisa, rápida y sin errores de pago. 

•	Doctor: Quiere que las citas agendadas se reflejen correctamente, recibir notificaciones de ellas y conocer datos del paciente antes de la consulta. 

•	Administrador: Quiere que la información se almacene correctamente y que la contabilidad se actualice. 

•	Agencia tributaria de gobierno: Quiere que las transacciones estén registradas correctamente, recopilar los impuestos por cada cita que se realice. 

•	Servicio de autorización de pagos: Quiere recibir solicitudes con un formato correcto autorizando o rechazando las transacciones.
Descripción:	El usuario inicia sesión en la aplicación, busca y selecciona un doctor de su preferencia. Selecciona una fecha y hora disponible. Se muestran los detalles de la cita. El usuario confirma la información, selecciona un método de pago y realiza la transacción. Se confirma el pago, se registra la cita, se genera el comprobante y se envían las notificaciones correspondientes al paciente y al doctor. 
Precondiciones:	El paciente tiene la aplicación instalada, está registrado y el doctor tiene horarios configurados.
Flujo Normal:
1.	El paciente inicia sesión en la aplicación, busca y selecciona un doctor de su preferencia. 

2.	Se selecciona una fecha y hora disponible. 

3.	Se muestran los detalles de la cita seleccionada. 

4.	Se verifican y confirman los datos de la cita. 

5.	Se muestran las opciones de pago disponibles. 

6.	El paciente selecciona un método de pago y realiza el pago.  

7.	Se confirma la autorización del pago. 

8.	Se registra la cita en el sistema. 

9.	Se envían las notificaciones al paciente y al doctor. 

10.	Se generan el comprobante de la cita.
Flujo Alternativo (Extensiones):
*a. En cualquier momento la aplicación falla: 
1.	Para soportar recuperación, el sistema guarda los estados significativos del proceso. 
2.	Se reinicia la aplicación. 
3.	El Sistema recupera el estado anterior si es posible. 

*b. El Sistema detecta inconsistencias en la recuperación: 
1.	El Sistema informa del error a la secretaria. 
2.	Se registra el incidente. 
3.	Se inicia nuevamente el proceso. 

1a. Las credenciales son incorrectas o el usuario olvido su contraseña. 
1.	Se notifica el error de autenticación. 
2.	El usuario solicita “Recuperar la contraseña” 
3.	Selecciona el método de recuperación (Correo electronico o Telefono Celular) 
4.	Ingresa el dato de contacto registrado 
4a. El dato ingresado no coincide con ningún registro. 
1. El sistema informa que el usuario no existe. 
2. El flujo regresa al paso 3 de esta extensión. 
4b. No recibe el código de verificación. 
1. El paciente solicita el reenvió del código tras agotar el tiempo de espera.  
5.	Se envía un código de verificación único.  
6.	El paciente ingresa el código y define una nueva contraseña. 
7.	Se valida y actualiza las credenciales en la base de datos. 

2a. El doctor no tiene disponibilidad en la fecha seleccionada.  
1. El sistema deshabilita la selección de dicha fecha en el calendario. 
2. Se muestra un mensaje indicando la falta de disponibilidad para ese día. 
3. El paciente selecciona una fecha alternativa con horarios activos.  

2b. El horario seleccionado deja de estar disponible.  
1. El sistema detecta que el horario fue reservado por otro paciente durante la sesión actual. 
2. Informa al paciente que el horario que desea ya no se encuentra disponible. 
3. Actualiza los horarios disponibles. 
4. El paciente selecciona un nuevo horario. 
 
4a. El paciente detecta errores en la información de la cita. 
1.	El paciente detecta información incorrecta (doctor, fecha, hora o especialidad) en la pantalla de resumen. 
2.	Rechaza la confirmación de los detalles. 
3.	El sistema descarta la selección temporal. 
4.	El flujo retorna al paso 2 del escenario principal para permitir una nueva selección. 

6a. Fallo en la comunicación con el Servicio de Autorización de Pagos: 
1.	El sistema detecta una pérdida de conexión o falta de respuesta del servicio de autorización. 
2.	Notifica al paciente que el servicio externo no está disponible temporalmente. 
3.	Ofrece la opción de Reintentar o Cambiar el método de pago. 
4.	Si el usuario cancela el pago, el sistema libera el horario reservado y finaliza el caso de uso sin éxito. 

6b. Expiración de la sesión de pago: 
1.	El Sistema detecta que el tiempo límite para completar la transacción de pago ha expirado. 
2.	Anula la reserva temporal del horario para permitir que otros pacientes lo seleccionen. 
3.	Notifica al paciente que la sesión ha expirado la sesión por inactividad. 
4.	El flujo retorna al inicio del proceso de reserva. 

6c. Datos bancarios o de tarjeta incorrectos 
1.	El Servicio de Autorización rechaza la transacción debido a datos inválidos (número de tarjeta, CVV o fecha de expiración erróneos). 
2.	Se muestra el error específico retornado por la entidad bancaria. 
3.	Se permite al Usuario corregir los datos o seleccionar un nuevo método de pago. 

7a. El sistema no recibe confirmación de la transacción: 
1. El Sistema detecta que el tiempo de espera con la pasarela de pagos a 		expirado sin recibir un código de aprobación o rechazo. 
2. Pone la cita en estado "Pendiente de Validación" y el horario queda 			bloqueado temporalmente para que nadie más lo use.  
3. Informa al Usuario que el pago está en proceso de validación.  
4. Se consulta en segundo plano el estado final de la transacción con el 			servicio de pagos.   

4a. El pago fallido: 
1. Se libera el horario y solicita al usuario reintentar el pago. 

4b. El pago fue completado: 
1. Se confirma la cita automáticamente y envía las notificaciones. 

7b. El usuario cierra la aplicación antes de mostrar la confirmación: 
1.	El Sistema asegura que la transacción se completó en la base de datos (Postcondición cumplida). 
2.	Se envía la notificación por canales externos (Email) para que el usuario tenga el registro fuera de la aplicación. 

9a. Fallo en él envió de notificaciones (Email, SMS, PUSH): 
1.	El Sistema detecta que el servicio de mensajería externo no respondió. 
2.	Registra la notificación como "Pendiente" en la cola de envíos para reintento automático. 
3.	Muestra un mensaje al Usuario. 
 
9b. El doctor no recibe la notificación: 
1.	El Sistema identifica que la cuenta del doctor no tiene un dispositivo vinculado o el buzón está lleno. 
2.	Marca la cita como "No leída" en el panel de control del doctor. 
3.	Genera una alerta prioritaria para el personal administrativo del consultorio para asegurar que el doctor sea informado manualmente. 

10a. Error al generar el comprobante de pago: 
1.	El Sistema encuentra un error al renderizar el archivo del comprobante. 
2.	Se le ofrece al Usuario la opción de Reintentar descarga o ver detalles en pantalla. 
3.	Se envía una copia del comprobante. 
Postcondiciones:	Se registra la cita. El impuesto se calcula de manera correcta. Se actualiza la contabilidad, el horario de disponibilidad del doctor. Se genera el comprobante de la cita. Se registra las autorizaciones de pago aprobadas.
Requisitos Especiales:
•	El sistema debe cifrar la contraseña de los pacientes. 
•	Diseño sencillo con el que el paciente se sienta familiarizado en aproximadamente 1 minuto. 
•	Tiempo de respuesta para la autorización del pago en menos de 10 segundos. 
•	El paciente debería de poder agendar su cita en menos de 10 interacciones. 
•	Los pagos deben de realizarse mediante protocolos seguros. 
Lista de Tecnología y Variaciones:	1a. Se puede realizar el inicio de sesión mediante correo electrónico, celular, google o facebook. 
7a. Las notificaciones pueden enviarse por la aplicación, SMS y correo electrónico. 
7b. El comprobante de la cita puede generarse en PDF. 
Frecuencia:	Podría ser casi continuo.
Temas Abiertos:	•	¿Se permitirá agendar citas para terceros? 
•	¿Se permitirá que el paciente agregue notas o motivo de consulta durante el agendamiento? 
•	¿Cuáles son las variaciones de la ley de impuestos? 


Nombre:	CDU2 – Agendar Cita Recepcionista 
Actor:	Recepcionista
Personal Involucrado e intereses:	•	Recepcionista: Desea consultar la disponibilidad real y actualizada de los horarios médicos, registrar citas de forma ágil y precisa, y garantizar que el proceso de pago se realice sin errores para evitar inconsistencias administrativas. 

•	Paciente: Desea que su cita sea registrada correctamente, en el horario seleccionado, con un proceso de pago seguro y confiable, y recibir confirmación oportuna con los detalles correspondientes. 

•	Doctor: Desea que las citas agendadas se reflejen correctamente en su agenda, recibir notificaciones oportunas sobre nuevas citas y contar con la información de identificación del paciente antes de la consulta. 

•	Administrador: Desea que la información se almacene correctamente y que la contabilidad se actualice. 

•	Agencia tributaria de gobierno: Quiere que las transacciones estén registradas correctamente, recopilar los impuestos por cada cita que se realice. 
Descripción:	La recepcionista inicia el proceso de registro de una cita. Se solicitan y verifican los datos de identificación del paciente. Se registra su información. Se identifica el doctor conforme a la preferencia indicada y se consulta la disponibilidad de horarios. Se seleccionan fecha y hora, se confirman los detalles y se registra el método de pago elegido. Una vez procesado y confirmado el pago, la cita queda registrada, se genera el comprobante y se envían las notificaciones correspondientes. 
Precondiciones:	La Recepcionista tiene iniciada la sesión y el doctor tiene horarios configurados.
Flujo Normal: 

1.	Se inicia el proceso de registro de cita. 
2.	La recepcionista solicita al paciente sus datos de identificación. 
3.	Se verifica si el paciente se encuentra registrado. 
4.	Se busca y selecciona al doctor según la preferencia indicada. 
5.	Se consulta la disponibilidad de fechas y horarios. 
6.	La recepcionista selecciona la fecha y hora solicitadas por el paciente. 
7.	Se muestran los detalles de la cita para validación. (doctor, especialidad, consultorio, fecha y hora). 
8.	Se confirma la información registrada. 
9.	La recepcionista consulta al paciente el método de pago deseado (transferencia o tarjeta). 
10.	Se registra en el sistema el método de pago seleccionado. 
11.	El paciente realiza el pago correspondiente.  
12.	Se confirma el pago. 
13.	Se genera el comprobante. 
14.	Se envían las notificaciones correspondientes. 
Flujo Alternativo (Extensiones):
*a. En cualquier momento la aplicación falla: 
1.	Para soportar recuperación, el sistema guarda los estados significativos del proceso. 
2.	Se reinicia la aplicación. 
3.	El Sistema recupera el estado anterior si es posible. 

*b. El Sistema detecta inconsistencias en la recuperación: 
1.	El Sistema informa del error a la secretaria. 
2.	Se registra el incidente. 
3.	Se inicia nuevamente el proceso. 

3a. El paciente no está registrado en el sistema.  
1.	El sistema informa a la recepcionista que el paciente no se encuentra registrado. 
2.	Se selecciona la opción Registrar Paciente. 
3.	Se muestra el formulario para el registro de un nuevo paciente. 
4.	La recepcionista captura los datos requeridos conforme a la información proporcionada por el paciente. 

4a. El sistema detecta inconsistencias o errores de formato.  
1.	Aparece un mensaje indicando el error especifico.  
2.	Se corrige la información conforme a los datos proporcionados por el paciente. 
3.	Se vuelve a validar la información. 
5.	Se muestra un resumen con los datos ingresados para su validación. 
6.	El paciente verifica la información capturada. 
7.	Confirma que los datos son correctos. 
7a. Detecta errores en los datos mostrados. 
1.	Solicita la corrección de la información incorrecta. 
2.	Se actualizan los datos en el sistema.  
3.	Se valida nuevamente la información ingresada. 
8.	La recepcionista confirma el registro del paciente en el sistema. 
9.	El sistema crea el nuevo registro del paciente y lo asocia al proceso actual de agendamiento. 
10.	 El flujo retorna al paso 6 del escenario principal de éxito. 

6a. El doctor no tiene disponibilidad en la fecha seleccionada.  
1. Se deshabilita la selección de dicha fecha en el calendario. 
2. Aparece un mensaje indicando la falta de disponibilidad para ese día. 
3. La recepcionista selecciona una fecha alternativa con horarios activos.  

6b. El horario seleccionado deja de estar disponible.  
1. El sistema detecta que el horario fue reservado por algún paciente durante la 		sesión actual. 
2. Se informa a la secretaria que el horario que desea ya no se encuentra 			disponible. 
3. Se actualizan los horarios disponibles. 
4. La recepcionista selecciona un nuevo horario. 

8a. La recepcionista detecta errores en la información de la cita. 
1.	La recepcionista detecta información incorrecta (doctor, fecha, hora o especialidad) en la pantalla de resumen. 
2.	Se rechaza la confirmación de los detalles. 
3.	Se descarta la selección temporal. 
4.	El flujo retorna al paso 2 del escenario principal para permitir una nueva selección. 

9a. Pago mediante tarjeta. 
1.	Se selecciona la opción en el sistema de pago con tarjeta. 
2.	La recepcionista facilita el dispositivo correspondiente para que facilite el pago. 
3.	Se envía la solicitud de autorización al servicio de pagos. 
4.	El flujo continuo en el paso 12 del escenario principal. 

9b. Pago mediante transferencia bancaria. 
1.	Se registra la selección del método de pago por transferencia bancaria. 
2.	Se proporcionan los datos necesarios para realizar la transferencia correspondiente. 
3.	Se otorga un plazo para que el paciente realice la operación. 
4.	Se registra la cita en estado pendiente de confirmación de pago. 
5.	Una vez confirmada la recepción del monto, se valida el pago. 
6.	El flujo continúa en el paso 13 del escenario principal. 

12a. El pago con tarjeta es rechazado. 
1.	El servicio de autorización de pagos rechaza la transacción. 
2.	El dispositivo correspondiente muestra el mensaje de error. 
3.	Se le informa al paciente el error en el pago. 
4.	Se le consulta al paciente si desea reintentar el pago o pagar en efectivo. 
4a. Decide reintentar el pago. 
a.	El reintento fue exitoso 
1.	El sistema procesa nuevamente la transacción. 
2.	El servicio de autorización aprueba el pago. 
3.	El flujo regresa al paso 12 del escenario principal. 
b.	Reintentó no exitoso 
1.	El servicio de autorización vuelve a rechazar el pago. 
2.	El flujo regresa al paso 9 del escenario principal. 

12b. Fallo en la comunicación con el Servicio de Autorización de Pagos: 
5.	El sistema detecta una pérdida de conexión o falta de respuesta del servicio de autorización. 
6.	Notifica al paciente que el servicio externo no está disponible temporalmente. 
7.	Ofrece la opción de Reintentar o Cambiar el método de pago. 
8.	Si el usuario cancela el pago, el sistema libera el horario reservado y finaliza el caso de uso sin éxito. 

12c. Expiración de la sesión de pago: 
5.	El Sistema detecta que el tiempo límite para completar la transacción de pago ha expirado. 
6.	Anula la reserva temporal del horario para permitir que otros pacientes lo seleccionen. 
7.	Notifica al paciente que la sesión ha expirado la sesión por inactividad. 
8.	El flujo retorna al inicio del proceso de reserva. 

12d. El sistema no recibe confirmación de la transacción: 
1. El Sistema detecta que el tiempo de espera con la pasarela de pagos a 		expirado sin recibir un código de aprobación o rechazo. 
2. Pone la cita en estado "Pendiente de Validación" y el horario queda 			bloqueado temporalmente para que nadie más lo use.  
3. Informa al Usuario que el pago está en proceso de validación.  
4. Se consulta en segundo plano el estado final de la transacción con el 			servicio de pagos.   
4a. El pago fallido: 
1. Se libera el horario y solicita al usuario reintentar el pago. 
4b. El pago fue completado: 
1. Se confirma la cita automáticamente y envía las notificaciones. 

14a. Fallo en él envió de notificaciones (Email, SMS): 
1.	El Sistema detecta que el servicio de mensajería externo no respondió. 
2.	Registra la notificación como "Pendiente" en la cola de envíos para reintento automático. 
3.	Se muestra un mensaje al Usuario. 

14b. El doctor no recibe la notificación: 
1.	El Sistema identifica que la cuenta del doctor no tiene un dispositivo vinculado o el buzón está lleno. 
2.	Se marca la cita como "No leída" en el panel de control del doctor. 
3.	Se genera una alerta prioritaria para el personal administrativo del consultorio para asegurar que el doctor sea informado manualmente. 

Postcondiciones:	Se registra la cita. El impuesto se calcula de manera correcta. Se actualiza la contabilidad, el horario de disponibilidad del doctor. Se genera el comprobante de la cita. Se registra las autorizaciones de pago aprobadas.
Requisitos Especiales:
•	El sistema debe cifrar la contraseña de acceso de la recepcionista. 
•	Tiempo de respuesta para la autorización del pago en menos de 10 segundos. 
•	La recepcionista debería de poder agendar su cita en menos de 10 interacciones. 
•	Los pagos deben de realizarse mediante protocolos seguros. 
Lista de Tecnología y Variaciones:	9a. El pago puede realizarse mediante terminal bancaria (TPV) para tarjeta de débito o crédito. 
14a. Las notificaciones pueden enviarse por la aplicación, SMS y correo electrónico. 
Frecuencia:	Podría ser ocasional.
Temas Abiertos:	•	¿El paciente puede realizar pagos en efectivo? 

Nombre:	CDU3 – Registrar Paciente 
Actor:	Paciente
Personal Involucrado e intereses:	•	Paciente: Desea registrarse de manera rápida y sencilla, garantizando que su información personal sea almacenada de forma segura y protegida. 
•	Doctor: Desea que los pacientes registren correctamente sus datos de identidad para contar con información confiable antes de una consulta. 
•	Administrador: Desea que el registro de pacientes sea íntegro y consistente, y que el sistema genere métricas que permitan medir el crecimiento y uso de la aplicación. 
Descripción:	El paciente solicita registrarse. Se muestra un formulario de registro solicitando la información necesaria. El paciente ingresa sus datos de identidad y selecciona la opción de crear cuenta. Se valida la información proporcionada y se crea la cuenta correspondiente.  
Precondiciones:	El paciente tiene la aplicación instalada y en ejecución. El paciente no cuenta con una sesión activa en el sistema.
Flujo Normal: 

1.	El paciente solicita registrarse. 

2.	Se muestra la pantalla de registro con el formulario correspondiente solicitando la información requerida. 

3.	El paciente ingresa los datos de identidad solicitados. 

4.	Selecciona la opción “Crear cuenta”. 

5.	Se valida la información ingresada. 

6.	Se confirma que el registro fue exitoso.
Flujo Alternativo (Extensiones):

*a. En cualquier momento la aplicación falla: 
1.	Para soportar recuperación, el sistema guarda los estados significativos del proceso. 
2.	Se reinicia la aplicación. 
3.	El Sistema recupera el estado anterior si es posible. 

*b. El Sistema detecta inconsistencias en la recuperación: 
4.	Se informa del error. 
5.	Se registra el incidente. 
6.	Se inicia nuevamente el proceso. 

1a. Registro con método alternativo 
1.	Se selecciona registro con Google o Facebook. 
2.	El sistema lo dirige a la elección de la cuenta a ligar de la aplicación seleccionada. 
3.	Se selecciona la cuenta que va a vincular para su registro. 
4.	Se confirma la autorización del acceso a la información de su cuenta. 
5.	Se recuperan los datos necesarios de la cuenta para completar el registro. 
6.	Se crea la cuenta. 

5a. Campos vacíos o inválidos 
1.	Aparece un mensaje indicando los campos que están vacíos o en formato incorrecto. 
2.	El paciente corrige la información. 
3.	Selecciona nuevamente la opción de “crear cuenta”. 

5b. Usuario ya registrado 
1.	Se detecta que el correo o el teléfono proporcionado ya fue usado para otra cuenta. 
2.	Aparece un mensaje informando al paciente. 
3.	Se ofrece la opción de “iniciar sesión”. 
4.	El paciente selecciona “iniciar sesión” o corrige los datos para el registro y presiona nuevamente “crear cuenta”. 

Postcondiciones:	La cuenta del paciente queda creada y almacenada correctamente. Los datos ingresados han sido validados conforme a las reglas del sistema. El paciente puede autenticarse posteriormente utilizando las credenciales registradas.
Requisitos Especiales:

•	El sistema debe cifrar la contraseña de los pacientes. 
•	Diseño sencillo con el que el paciente se sienta familiarizado en aproximadamente 1 minuto. 
•	El paciente debería de poder registrarse en menos de 5 interacciones. 
•	El sistema debe cumplir con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. 

Lista de Tecnología y Variaciones:	1a. Se puede realizar el registro mediante correo electrónico, celular, google o Facebook. 
Frecuencia:	Podría ser casi continuo
Temas Abiertos:	•	¿La secretaria podrá registrar pacientes en la aplicación? 

Nombre:	CDU4 – Cancelar Cita Paciente
Actor:	Paciente
Personal Involucrado e intereses:	•	Paciente: Desea cancelar la cita de forma rápida, sencilla y segura, y recibir la devolución del anticipo cuando corresponda. 
•	Doctor: Desea que la cancelación se refleje correctamente en su agenda y recibir una notificación inmediata. 
•	Administrador: Desea que la cancelación quede registrada correctamente y que la contabilidad del sistema se actualice. 
•	Agencia tributaria de gobierno: Desea que los ajustes contables derivados de la cancelación estén correctamente registrados. 
•	Servicio de autorización de pagos: Desea recibir correctamente la solicitud de reembolso y procesarla de forma segura. 

Descripción:	El paciente solicita visualizar sus citas registradas y se muestran todas las citas asociadas a su cuenta. Selecciona la cita que desea cancelar y se despliega la información detallada correspondiente. Solicita la cancelación de la cita y se presentan las políticas de cancelación para su confirmación. Tras confirmar la cancelación, la cita se marca como cancelada, se actualiza la disponibilidad del doctor, se procesa la devolución del anticipo y se envían las notificaciones correspondientes al paciente y al doctor. 

Precondiciones:	El paciente tiene la aplicación instalada y abierta. El paciente ha iniciado sesión en el sistema. La cita se encuentra previamente registrada. 
Flujo Normal: 

1.	El paciente solicita visualizar sus citas registradas. 
2.	Se muestran todas las citas asociadas a su cuenta. 
3.	Selecciona la cita que desea cancelar. 
4.	Se despliega la información detallada de la cita seleccionada. 
5.	Solicita la cancelación de la cita. 
6.	Se presentan las políticas de cancelación para su confirmación. 
7.	Confirma la cancelación de la cita. 
8.	La cita se marca como cancelada. 
9.	Se actualiza la disponibilidad del doctor. 
10.	 Se procesa la devolución del anticipo. 
11.	 Se envían las notificaciones correspondientes al paciente y al doctor. 
Flujo Alternativo (Extensiones):

*a. En cualquier momento la aplicación falla: 
1.	Para soportar recuperación, el sistema guarda los estados significativos del proceso. 
2.	Se reinicia la aplicación. 
3.	El sistema recupera el estado anterior si es posible. 

*b. El Sistema detecta inconsistencias en la recuperación: 
1.	Se informa del error al paciente. 
2.	Se registra el incidente. 
3.	El paciente inicia nuevamente el proceso. 

7a. El paciente decide no confirmar la cancelación 
1.	El paciente cancela la operación antes de confirmar. 
2.	La cita permanece sin modificaciones. 
3.	El caso de uso finaliza sin cambios. 

10a. La cancelación se realiza con menos de 24 horas de anticipación 
1.	Se determina que no aplica devolución del anticipo. 
2.	La cancelación se registra sin generar reembolso. 
3.	Se informa al paciente que no habrá devolución. 

10b. Fallo en el servicio de autorización de pagos 
1.	La cancelación se registra correctamente. 
2.	La devolución queda en estado pendiente. 
3.	El administrador es notificado para revisión. 
4.	Se informa al paciente sobre el posible retraso en la devolución.   
Postcondiciones:	La cita queda marcada como cancelada. Se actualiza la disponibilidad del doctor. Se actualiza la contabilidad del sistema. Se notifica al paciente y al doctor sobre la cancelación. Se realiza correctamente la devolución del anticipo cuando corresponde.
Requisitos Especiales:

•	El paciente y el doctor deben recibir la notificación en un tiempo no mayor a 10 segundos después de confirmada la cancelación. 
•	El paciente debe poder cancelar la cita en un máximo de 5 interacciones. 
•	La devolución del anticipo debe realizarse mediante protocolos de pago seguros. 
•	El tiempo de respuesta para la devolución del anticipo debe ser menor a 10 segundos. 
•	El sistema debe garantizar la integridad de los registros contables. 
Lista de Tecnología y Variaciones:	11a. La notificación puede enviarse por notificación interna de la aplicación, correo electrónico o mensaje SMS. 
Frecuencia:	Podría ser ocasional.
Temas Abiertos:	•	¿Habrá un límite de cancelaciones por cliente? 

Nombre:	CDU5 – Cancelar Cita Doctor
Actor:	Doctor
Personal Involucrado e intereses:	•	Doctor: Desea que la cancelación de la cita se realice de forma rápida y sin errores, devolviendo el monto entregado como anticipo al paciente. 
•	Paciente: Desea que las citas canceladas se reflejen correctamente, recibir notificaciones de la cancelación y obtener la devolución del anticipo. 
•	Administrador: Desea que la cancelación quede registrada correctamente y que la contabilidad del sistema se actualice. 
•	Agencia tributaria de gobierno: Desea que los ajustes contables derivados de la cancelación estén correctamente registrados. 
•	Servicio de autorización de pagos: Desea recibir correctamente las solicitudes de reembolso cuando se apliquen. 

Descripción:	El doctor solicita visualizar sus citas registradas y se muestran todas las citas asociadas a su agenda. Selecciona la cita que desea cancelar y se despliega la información detallada correspondiente. Solicita la cancelación de la cita y se muestra un mensaje de advertencia solicitando confirmación. Tras confirmar la cancelación, la cita se marca como cancelada, se procesa la devolución del anticipo al paciente y se envían las notificaciones correspondientes tanto al doctor como al paciente. 

Precondiciones:	El doctor tiene la aplicación instalada y abierta. El doctor ha iniciado sesión en el sistema. La cita se encuentra previamente registrada.
Flujo Normal: 

1.	El doctor solicita visualizar sus citas registradas. 
2.	Se muestran todas las citas asociadas a su agenda. 
3.	Selecciona la cita que desea cancelar. 
4.	Se despliega la información detallada de la cita seleccionada. 
5.	Solicita la cancelación de la cita. 
6.	Se muestra un mensaje de advertencia solicitando confirmación. 
7.	Confirma la cancelación de la cita.  
8.	La cita se marca como cancelada. 
9.	Se procesa la devolución del anticipo al paciente. 
10.	Se envían las notificaciones correspondientes al doctor y al paciente. 
Flujo Alternativo (Extensiones):

*a. En cualquier momento la aplicación falla: 
1.	Para soportar recuperación, el sistema guarda los estados significativos del proceso. 
2.	El doctor reinicia la aplicación. 
3.	El sistema recupera el estado anterior si es posible. 

7a. El doctor decide no confirmar la cancelación 
1.	El doctor cancela la operación antes de confirmar. 
2.	La cita permanece sin modificaciones. 
3.	El caso de uso finaliza sin cambios. 

9a. Fallo en el servicio de autorización de pagos 
1.	La cancelación de la cita se registra correctamente. 
2.	La devolución queda en estado pendiente. 
3.	La recepcionista es notificada para revisión. 
4.	Se informa al paciente sobre el posible retraso en la devolución.    
Postcondiciones:	La cita queda marcada como cancelada. Se actualiza la disponibilidad del doctor. Se actualiza la contabilidad del sistema. Se notifica al paciente y al doctor sobre la cancelación. Se realiza correctamente la devolución del anticipo.
Requisitos Especiales:

•	El paciente y el doctor deben recibir la notificación de la cancelación en un tiempo no mayor a 10 segundos después de realizada exitosamente. 
•	El doctor debe poder cancelar la cita en un máximo de 5 interacciones dentro de la aplicación. 
•	La devolución del anticipo debe realizarse mediante protocolos seguros. 
•	El inicio del proceso de devolución no debe superar los 10 segundos. 
Lista de Tecnología y Variaciones:	10a. La notificación puede enviarse por notificación interna de la aplicación, correo electrónico o mensaje SMS. 
Frecuencia:	Podría ser ocasional.
Temas Abiertos:	•	¿Existirá un límite de cancelaciones por doctor en un periodo determinado? 
•	¿Se aplicará alguna penalización administrativa por cancelaciones reiteradas? 
•	¿Se permitirá ofrecer algún tipo de opción de “reprogramación” de una cita sin la necesidad de cancelarla? 

Nombre:	CDU6 – Cancelar Cita Recepcionista
Actor:	Recepcionista
Personal Involucrado e intereses:	•	Recepcionista: Quiere que la cancelación de la cita se lleve a cabo de forma rápida y sin errores, devolviendo el monto dado como anticipo si la cancelación se realiza en un tiempo mayor a 24 horas antes de la cita. 
•	Paciente: Quiere que las citas canceladas se reflejen correctamente, recibir notificaciones de ellas y recibir la devolución del anticipo cuando corresponda. 
•	Doctor: Quiere que las citas canceladas se reflejen correctamente en su agenda y recibir notificaciones oportunas. 
•	Administrador: Quiere que la cancelación quede registrada correctamente y que la contabilidad del sistema se actualice. 
•	Agencia tributaria de gobierno: Quiere que los ajustes contables generados por cancelaciones estén correctamente registrados. 
•	Servicio de autorización de pagos: Quiere recibir correctamente las solicitudes de devolución cuando aplique. 

Descripción:	La recepcionista ingresa al apartado de citas. Se muestran todas las citas registradas. Selecciona la cita que desea cancelar y se despliega la información completa de la misma. Solicita cancelar la cita. Se muestra un mensaje de advertencia solicitando confirmar la cancelación. La recepcionista confirma la decisión. La cita se marca como cancelada. Si la cancelación se realiza con más de 24 horas de anticipación, se realiza la devolución del anticipo. Finalmente se notifica tanto al doctor como al paciente sobre la cancelación de la cita. 

Precondiciones:	La recepcionista tiene la aplicación instalada y abierta. La cita se encuentra previamente registrada en el sistema.
Flujo Normal: 

1.	La recepcionista ingresa al apartado de citas. 
2.	Se muestran todas las citas registradas. 
3.	Selecciona la cita que desea cancelar. 
4.	Se despliega la información completa de la cita seleccionada. 
5.	Solicita cancelar la cita. 
6.	Se muestra un mensaje de advertencia solicitando confirmar la cancelación. 
7.	La recepcionista confirma la cancelación. 
8.	La cita se marca como cancelada. 
9.	Se realiza la devolución del anticipo.  
10.	Se notifica tanto al doctor como al paciente sobre la cancelación de la cita. 
Flujo Alternativo (Extensiones):

*a. En cualquier momento la aplicación falla 
1.	Para soportar recuperación, se guardan los estados significativos del proceso. 
2.	La recepcionista reinicia la aplicación. 
3.	Se recupera el estado anterior del proceso si es posible. 
*b. El sistema detecta inconsistencias en la recuperación 
1.	Se informa del error a la recepcionista. 
2.	Se registra el incidente. 
3.	Se inicia nuevamente el proceso. 

*c. La cancelación se realiza con menos de 24 horas de anticipación 
1.	Se detecta que la cita está dentro del periodo donde no aplica reembolso. 
2.	Se informa que, de acuerdo con los términos establecidos, no se realizará la devolución del anticipo. 
3.	Se solicita confirmar si se desea continuar con la cancelación. 

7a. El paciente decide no confirmar la cancelación 
1.	Se cancela la operación antes de confirmar. 
2.	La cita permanece sin modificaciones. 

9a. Fallo en el servicio de autorización de pagos 
1.	La cancelación de la cita queda registrada. 
2.	La devolución se coloca en estado pendiente. 
3.	El administrador es notificado para revisión. 
4.	El paciente es informado sobre el posible retraso en la devolución.    
Postcondiciones:	La cita queda marcada como cancelada. La disponibilidad del horario del doctor se actualiza. Se notifica al paciente y al doctor sobre la cancelación de la cita. Si la cancelación se realizó con más de 24 horas de anticipación, se devuelve el anticipo.
Requisitos Especiales:

•	El paciente y el doctor deben recibir la notificación de la cancelación de la cita en un tiempo no mayor a 10 segundos después de que la cancelación se realizó de forma exitosa. 
•	La recepcionista debe de poder cancelar la cita en un máximo de 8 interacciones. 
•	La devolución del anticipo debe realizarse mediante protocolos seguros y el tiempo de respuesta para la devolución del anticipo debe ser menor a 10 segundos. 

Lista de Tecnología y Variaciones:	10a. La notificación puede enviarse por notificación interna de la aplicación, correo electrónico o mensaje SMS. 
Frecuencia:	Podría ser ocasional.
Temas Abiertos:	•	¿Habrá un límite de cancelaciones por paciente? 

Nombre:	CDU7 – Gestionar Consulta
Actor:	Doctor
Personal Involucrado e intereses:	•	Doctor: Desea registrar correctamente la información médica de la consulta para mantener actualizado el expediente clínico del paciente conforme a la norma NOM-004. 
•	Paciente: Desea que su información médica quede registrada correctamente para facilitar diagnósticos y tratamientos futuros. 
•	Administrador: Desea que la información médica quede almacenada de forma correcta y segura dentro del sistema. 
•	Agencia tributaria de gobierno: Desea que la consulta realizada quede correctamente registrada para fines fiscales y contables. 

Descripción:	El doctor accede a sus citas pendientes y se muestran las citas programadas. Selecciona la cita correspondiente al paciente y se despliega la información general del paciente junto con su historial clínico. Registra el motivo de consulta y captura las notas clínicas relevantes conforme a lo establecido en la norma NOM-004-SSA3-2012 para el expediente clínico. Actualiza la información de antecedentes, enfermedades previas y medicamentos actuales en caso de ser necesario. Posteriormente establece el diagnóstico y define el tratamiento e indicaciones médicas. Finalmente confirma el registro de la consulta; la información se guarda en el historial clínico del paciente, la cita se marca como finalizada y se actualizan los registros administrativos correspondientes. 

Precondiciones:	El doctor tiene la aplicación instalada y abierta. El doctor ha iniciado sesión en el sistema. Existe una cita registrada previamente para el paciente. El expediente del paciente se encuentra disponible en el sistema.
Flujo Normal: 

1.	El doctor accede a sus citas pendientes. 
2.	Se muestran las citas programadas. 
3.	Selecciona la cita correspondiente al paciente. 
4.	Se despliega la información general del paciente junto con su historial clínico. 
5.	Registra el motivo de consulta. 
6.	Captura las notas clínicas relevantes conforme a lo establecido en la norma NOM-004. 
7.	Actualiza la información de antecedentes, enfermedades previas y medicamentos actuales en caso de ser necesario. 
8.	Establece el diagnóstico. 
9.	Define el tratamiento e indicaciones médicas. 
10.	Confirma el registro de la consulta. 
11.	Se guarda la información en el historial clínico del paciente. 
12.	La cita se marca como finalizada. 
13.	Se actualizan los registros administrativos correspondientes.
Flujo Alternativo (Extensiones):

*a. En cualquier momento la aplicación falla 
1.	Para soportar recuperación, se guardan los estados significativos del proceso. 
2.	El doctor reinicia la aplicación. 
3.	Se recupera el estado anterior si es posible. 

b* El doctor decide cancelar el registro de la consulta 
4.	El doctor decide cancelar el registro antes de finalizar la consulta. 
5.	Se solicita confirmación para descartar la información capturada. 
6.	La información registrada no se guarda. 
7.	La cita permanece en estado pendiente de consulta. 
8.	El caso de uso finaliza. 

4a. No existe expediente clínico del paciente 
1.	Se detecta que el paciente no cuenta con expediente clínico registrado. 
2.	Se solicita crear un expediente antes de continuar conforme a la norma NOM-004. 
3.	El flujo regresa al paso 4 del escenario principal. 

6a. Información clínica incompleta 
1.	Se detecta que faltan datos obligatorios en el registro clínico conforme a la norma NOM-004. 
2.	Se solicita completar la información antes de continuar con el registro de la consulta. 

8a. El doctor modifica el diagnóstico antes de confirmar 
1.	El doctor decide ajustar el diagnóstico antes de confirmar el registro de la consulta. 
2.	Se permite modificar el diagnóstico y las indicaciones médicas. 
3.	El flujo regresa al paso 10 del escenario principal. 

10a. Error durante la confirmación del registro de la consulta 
1.	Se detecta un error al intentar confirmar el registro de la consulta. 
2.	Se informa al doctor que no fue posible completar la operación. 
3.	Se solicita intentar nuevamente la confirmación. 
4.	El flujo regresa al paso 10 del escenario principal. 

11a. Error al guardar la información 
1.	Se detecta un error al guardar los datos de la consulta. 
2.	Se informa al doctor del problema. 
3.	Se solicita intentar nuevamente el guardado de la información. 
Postcondiciones:	Se registra el motivo de consulta. Se almacenan las notas clínicas. Se registran antecedentes, enfermedades previas y medicamentos actuales. Se registra el diagnóstico del paciente. Se registra el tratamiento indicado. Se actualiza el historial clínico del paciente conforme a la norma NOM-004. La cita queda registrada como finalizada. Se actualizan los registros administrativos correspondientes.
Requisitos Especiales:

•	La información clínica debe almacenarse conforme a la norma NOM-004. 
•	El sistema debe cumplir con la Ley Federal de Protección de Datos Personales. 
•	El tiempo de guardado de la consulta no debe superar los 5 segundos en condiciones normales. 
•	Solo los doctores pueden finalizar una consulta. 
•	El sistema debe mantener un historial clínico. 
Lista de Tecnología y Variaciones:	11b. La información de la consulta se almacena en un servidor seguro conforme a la norma NOM-004-SSA3-2012.
Frecuencia:	Podría ser ocasional.
Temas Abiertos:	•	¿Se permitirá edición posterior a la finalización de la consulta? 
•	¿Se generará automáticamente una receta en formato PDF? 
2.3.- CARACTERÍSTICAS DE LOS USUARIOS
Tipo de Usuario	Administrador
Formación	Propietario del consultorio o personal administrativo sin formación técnica especializada en sistemas informáticos.
Habilidades	Uso y conocimientos básicos de aplicaciones móviles
Actividades	Registro y dar de alta doctores, consultar y generar reportes en base a registros de pacientes y uso de aplicación,

Tipo de Usuario	Paciente
Formación	Público general
Habilidades	Uso básico de aplicaciones móviles.
Actividades	Registrarse en la aplicación, generar cita médica, cancelar cita médica, realizar pagos.

Tipo de Usuario	Doctor
Formación	Profesional en medicina con certificación correspondiente.
Habilidades	Registro de información medica 
Actividades	Registrare y administrar horarios, consultar citas y registrar expediente.

Tipo de Usuario	Recepcionista
Formación	Personal administrativo con conocimientos básicos en atención al cliente y manejo de aplicaciones móviles.
Habilidades	Manejo básico de sistema y captura de información en digital.
Actividades	Registro de nuevos pacientes en el sistema, agendar y cancelar citas médicas, consultar horarios.

