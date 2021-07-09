import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ControladorService {

  constructor(private http:HttpClient) { }

  public get(url:string){
    return this.http.get(url);
  }

  public post(url:string, data:any){
    /*
    url: string => esta siempre sera una cadena de texto que indica la url
    del api  que provee  los datos 

    data: any => es un array asociativo que contiene los  parametros requeridos
    para hacer una consulta a la api o los datos que se quieren  enviar
    uno de elementos de este array es el dataNeeds que es un array que indicara al api las 
    tablas  de las que desea obtener informacion 
    
    */
    var formData = new FormData();
    //console.log("=============================SERVICIO POST=====================")
    for (var key in data) {
      formData.append(key,data[key]);
      //console.log(key +"==>"+ data[key]);
    }
    //debugger;
    return this.http.post(url,formData);
  }

  public searchSession(){
    var formData = new FormData();
    formData.append('user', localStorage.getItem('user'));
    formData.append('cedula', localStorage.getItem('cedula'));
    //return this.http.post('http://localhost/projects/ng/cronotec/src/app/php/authenticate.php',formData);
    return this.http.post('http://cuisoft.co/api/authenticate.php',formData);
  }

  public datos(){
      const datos = [
        {id:"1", nombre:"nombre1",proceso:"proceso1",cedula:"1"},
        {id:"2", nombre:"nombre2",proceso:"proceso2",cedula:"2"},
        {id:"3", nombre:"nombre3",proceso:"proceso3",cedula:"3"},
        {id:"4", nombre:"nombre4",proceso:"proceso4",cedula:"4"},
        {id:"5", nombre:"nombre5",proceso:"proceso5",cedula:"5"},
        {id:"6", nombre:"nombre6",proceso:"proceso6",cedula:"6"},
        {id:"7", nombre:"nombre7",proceso:"proceso7",cedula:"7"},
        {id:"8", nombre:"nombre8",proceso:"proceso8",cedula:"8"},
        {id:"9", nombre:"nombre9",proceso:"proceso9",cedula:"9"},
        {id:"10", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"11", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"12", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"13", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"14", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"15", nombre:"nombre0",proceso:"proceso0",cedula:"5"},
        {id:"16", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"17", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"18", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"19", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        {id:"20", nombre:"nombre0",proceso:"proceso0",cedula:"0"},
        
      ];
      return datos;
  }


  public componentLibrary(componentName, dataJson) {
    var myNode = ``
    switch (componentName) {
        case 'cronograma':
            myNode = `
            <table>
                    <caption>MI CRONOGRAMA</caption>
                    <tr>
                        <th class="tht">Nombre PC</th>
                        <th class="tht" id="oficinaTH">Oficina</th>
                        <th class="tht">Ultimo Mantenimiento</th>
                        <th class="thb"><img class="imgEdit" src="img/cogs-solid.svg" alt=""></th>
                    </tr>
                    `
            for (let index = 0; index < dataJson[1].length; index++) {
                //console.log(dataJson[index])
                if (dataJson[1][index].fecha) {
                    var fecha = new Date(dataJson[1][index].fecha.toString())
                    var today = new Date()
                    var diferencia = Math.abs(today.getTime() - fecha.getTime())
                    var dias = (diferencia / (1000 * 60 * 60 * 24))
                    if (dias > 120) {
                        myNode += `
                            <tr class="rowR">
                            `
                    } else if (dias <= 120 && dias > 90) {
                        myNode += `
                            <tr class="rowY">
                            `
                    } else if (dias <= 90) {
                        myNode += `
                            <tr class="rowG">
                            `
                    }
                } else {
                    myNode += `
                            <tr class="rowE">
                            `
                }

                myNode += `
                        <td>${dataJson[1][index].nombrepc}</td>
                        <td id="oficinaTH">${dataJson[1][index].proceso}</td>
                        <td>${dataJson[1][index].fecha}</td>
                        <td class="tdBtn" id="${dataJson[1][index].codigoActivo}">
                            <img class="imgEdit" src="img/edit-regular.svg" alt="">
                        </td>
                    </tr>
                `
            }
            myNode += `
            </table>
            `
            return myNode
            break;

        case 'nuevoEquipo':
            myNode = `
                    <div id="formRegistro">
                    <section id="cuerpo">
                        <h1 class="title-edit">REGISTRO NUEVO EQUIPO </h1>
                        <form id="registro-hv" class="registro-hv">
                            <div class="v_div">
                                <label for="nombre-pc">Nombre pc</label>
                                <input type="text" name="nombrepc" id="nombrepc" value="">
                            </div>
                            <h2>1. DATOS DEL EQUIPO</h2>
                            <br>
                            <div class="v_div">
                                <label for="marca">Marca</label>
                                <input required type="text" name="marca" id="marca" value="">
                                <label for="proveedor">Proveedor</label>
                                <input type="text" name="proveedor" id="proveedor" value="">
                                <label for="modelo">Modelo</label>
                                <input required type="text" name="modelo" id="modelo" value="">
                            </div>
                            <h2>2. CONFIGURACIÓN DE HARDWARE</h2>
                            <div id="divConfiguracionpc" class="h_div">
                                <div class="v_div" style="width: 50%; padding: 2%;">
                                    <label class="p_label" for="codigoActivo">Código Activo</label>
                                    <input required type="text" name="codigoActivo" id="codigoActivo" value="">

                                    <label for="modeloCPU">Modelo CPU</label>
                                    <input required type="text" name="modeloCPU" id="modeloCPU" value="">

                                    <label for="serialCPU">Serial CPU</label>
                                    <input required type="text" name="serialCPU" id="serialCPU" value="">

                                    <label for="procesador">Procesador</label>
                                    <input type="text" name="procesador" id="procesador" value="">

                                    <label for="velocidad">Velocidad CPU</label>
                                    <input type="text" name="velocidad" id="velocidad" value="">

                                    <label for="ram">Memoria RAM</label>
                                    <input type="text" name="ram" id="ram" value="">

                                    <label for="marcaDD">Marca DD</label>
                                    <input type="text" name="marcaDD" id="marcaDD" value="">

                                    <label for="capacidad">Capacidad DD</label>
                                    <input type="text" name="capacidad" id="capacidad" value="">

                                </div>
                                <div class="v_div" style="width: 50%; padding: 2%;">

                                    <label for="tecnologia">Tecnologia DD</label>
                                    <input type="text" name="tecnologia" id="tecnologia" value="">

                                    <label for="monitor">Marca y/o modelo Monitor</label>
                                    <input required type="text" name="monitor" id="monitor" value="">

                                    <label for="serialmonitor">Serial Monitor / Cod Activo</label>
                                    <input required type="text" name="serialmonitor" id="serialmonitor" value="">

                                    <label for="teclado">Marca y/o modelo Teclado</label>
                                    <input type="text" name="teclado" id="teclado" value="">

                                    <label for="serialteclado">Serial Teclado</label>
                                    <input type="text" name="serialteclado" id="serialteclado" value="">

                                    <label for="mouse">Marca y/o modelo Mouse</label>
                                    <input type="text" name="mouse" id="mouse" value="">

                                    <label for="serialmouse">Serial Mouse</label>
                                    <input type="text" name="serialmouse" id="serialmouse" value="">

                                    <label for="otro">Otro</label>
                                    <input type="text" name="otro" id="otro" value="">
                                </div>
                            </div>
                            <h2>3. CONFIGURACIÓN DE RED</h2>
                            <br>
                            <div class="v_div">
                                <table style="width: 100%;">
                                    <tr>
                                        <!--<th><label for="nombreequipo">Nombre del Equipo</label></th>-->
                                        <th><label>En red</label></th>
                                        <th><label>Dirección IP</label></th>
                                        <th><label>Dirección MAC</label></th>
                                        <th><label>Velocidad</label></th>
                                        <th><label>Marca</label></th>
                                    </tr>
                                    <tr>
                                        <!--<td><input required class="text-input required-center" type="text" name="nombreequipo" id="nombreequipo"value="" placeholder="Nombre Equipo"></input required></td>-->
                                        <td>
                                            <input class="text-input-center" type="text" name="red" id="red" value="" placeholder="SI/NO"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="ip" id="ip" value="" placeholder="IP"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="mac" id="mac" value="" placeholder="MAC"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="velocidadtarjeta" id="velocidadtarjeta" value="" placeholder="Velocidad Tarjeta"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="marcatarjeta" id="marcatarjeta" value="" placeholder="Marca Tarjata"></input>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <h2>4. SISTEMA OPERATIVO INSTALADO</h2>
                            <br>
                            <div class="v_div">
                                <label for="so">Descripción</label>
                                <input type="text" name="so" id="so" value="" placeholder="Sistema Operativo">
                            </div>

                            <h2>5. UBICACIÓN ACTUAL</h2>
                            <br>
                            <div class="v_div">
                                <table style="width: 100%;">
                                    <tr>
                                        <th><label> Usuario Responsable</label></th>
                                        <th><label> Ubicación dentro de la empresa</label></th>
                                        <th><label> Fecha</label></th>
                                        <th><label>Entrega</label></th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input class="text-input-center" type="text" name="usrresponsable" id="usrresponsable" placeholder="Nombre Usuario"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="ubicacion" id="ubicacion" placeholder="Oficina a Cargo"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="date" name="fecha" id="fecha"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="realizo" id="realizo" placeholder="Nombre"></input>
                                        </td>
                                    </tr>
                                </table>
                                <div id="dv" class="" style="border:none" width="100%">
                                    <label for="canvas">Firma Usr Responsable</label>
                                    <canvas id="canvas" style="border:solid black 2px; width: 100%; box-sizing: border-box;"></canvas>
                                    <button id="clear-firm" type="button" name="button" class="boton_personalizado">Borrar firma</button>
                                    <button id="send-firm" type="button" name="button" style="display: none">Enviar Firma</button>
                                    <textarea id="data-url" name="data-url" width="100%" style="display: none">
                                    </textarea>
                                    <img id="img-firm" src="" alt="">
                                </div>


                            </div>
                            <h2><label for="recomendaciones">6. RECOMENDACIONES Y/O OBSERVACIONES</label></h2>
                            <div class="v_div">
                                <textarea style="box-sizing: border-box;" name="recomendaciones" name="recomendaciones" id="recomendaciones" rows="8" cols="80"></textarea>
                            </div>
                            <input style="display: none" type="text" id="nuevo" name="nuevo" value="nuevo">
                            <div class="button-container">
                                <button id="" type="submit" class="boton_personalizado" name="button">GUARDAR</button>
                            </div>
                            <br>
                            <br>
                            <br>
                            <br>
                        </form>
                    </section>
                </div>
                `
            return myNode
            break;

        case 'registroSoporte':
            myNode = `
                <div id="formRegistro">
                    <section id="cuerpo">
                        <h1 class="title-edit">REGISTRO NUEVO EQUIPO </h1>
                        <form id="registroSoporte" class="registroSoporte">
                            <div class="v_div">
                                <label for="nombre-pc">Nombre pc</label>
                                <input type="text" name="nombrepc" id="nombrepc" value="${dataJson[1][0].nombrepc}" readonly>
                            </div>
                            <h2>1. DATOS DEL EQUIPO</h2>
                            <br>
                            <div class="v_div">
                                <label for="marca">Marca</label>
                                <input required type="text" name="marca" id="marca" value="${dataJson[1][0].marca}" readonly>
                                <label for="proveedor">Proveedor</label>
                                <input type="text" name="proveedor" id="proveedor" value="${dataJson[1][0].proveedor}" readonly>
                                <label for="modelo">Modelo</label>
                                <input required type="text" name="modelo" id="modelo" value="${dataJson[1][0].modelo}" readonly>
                            </div>
                            <h2>2. CONFIGURACIÓN DE HARDWARE</h2>
                            <div id="divConfiguracionpc" class="h_div">
                                <div class="v_div" style="width: 50%; padding: 2%;">
                                    <label class="p_label" for="codigoActivo">Código Activo</label>
                                    <input required type="text" name="codigoActivo" id="codigoActivo" value="${dataJson[1][0].codigoActivo}" readonly>

                                    <label for="modeloCPU">Modelo CPU</label>
                                    <input required type="text" name="modeloCPU" id="modeloCPU" value="${dataJson[1][0].modeloCPU}" readonly>

                                    <label for="serialCPU">Serial CPU</label>
                                    <input required type="text" name="serialCPU" id="serialCPU" value="${dataJson[1][0].serialCPU}" readonly>

                                    <label for="procesador">Procesador</label>
                                    <input type="text" name="procesador" id="procesador" value="${dataJson[1][0].procesador}" readonly>

                                    <label for="velocidad">Velocidad CPU</label>
                                    <input type="text" name="velocidadProcesador" id="velocidadProcesador" value="${dataJson[1][0].velocidadProcesador}" readonly>

                                    <label for="ram">Memoria RAM</label>
                                    <input type="text" name="ram" id="ram" value="${dataJson[1][0].ram}" readonly>

                                    <label for="marcaDD">Marca DD</label>
                                    <input type="text" name="marcaDD" id="marcaDD" value="${dataJson[1][0].marcaDD}" readonly>

                                    <label for="capacidad">Capacidad DD</label>
                                    <input type="text" name="capacidadDD" id="capacidadDD" value="${dataJson[1][0].capacidadDD}" readonly>

                                </div>
                                <div class="v_div" style="width: 50%; padding: 2%;">

                                    <label for="tecnologia">Tecnologia DD</label>
                                    <input type="text" name="tecnologiaDD" id="tecnologiaDD" value="${dataJson[1][0].tecnologiaDD}" readonly>

                                    <label for="monitor">Marca y/o modelo Monitor</label>
                                    <input required type="text" name="mmMonitor" id="mmMonitor" value="${dataJson[1][0].mmMonitor}" readonly>

                                    <label for="serialmonitor">Serial Monitor / Cod Activo</label>
                                    <input required type="text" name="scMonitor" id="scMonitor" value="${dataJson[1][0].scMonitor}" readonly>

                                    <label for="teclado">Marca y/o modelo Teclado</label>
                                    <input type="text" name="mmTeclado" id="mmTeclado" value="${dataJson[1][0].mmTeclado}" readonly>

                                    <label for="serialteclado">Serial Teclado</label>
                                    <input type="text" name="scTeclado" id="scTeclado" value="${dataJson[1][0].scTeclado}" readonly>

                                    <label for="mouse">Marca y/o modelo Mouse</label>
                                    <input type="text" name="mmMouse" id="mmMouse" value="${dataJson[1][0].mmMouse}" readonly>

                                    <label for="serialmouse">Serial Mouse</label>
                                    <input type="text" name="scMouse" id="scMouse" value="${dataJson[1][0].scMouse}" readonly>

                                    <label for="otro">Otro</label>
                                    <input type="text" name="otro" id="otro" value="${dataJson[1][0].otro}" readonly>
                                </div>
                            </div>
                            <h2>3. CONFIGURACIÓN DE RED</h2>
                            <br>
                            <div class="v_div">
                                <table style="width: 100%;">
                                    <tr>
                                        <!--<th><label for="nombreequipo">Nombre del Equipo</label></th>-->
                                        <th><label>En red</label></th>
                                        <th><label>Dirección IP</label></th>
                                        <th><label>Dirección MAC</label></th>
                                        <th><label>Velocidad</label></th>
                                        <th><label>Marca</label></th>
                                    </tr>
                                    <tr>
                                        <!--<td><input required class="text-input required-center" type="text" name="nombreequipo" id="nombreequipo"value="${dataJson[0].nombrepc}" readonly placeholder="Nombre Equipo"></input required></td>-->
                                        <td>
                                            <input class="text-input-center" type="text" name="enRed" id="red" value="${dataJson[1][0].enRed}" readonly placeholder="SI/NO"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="ip" id="ip" value="${dataJson[1][0].ip}" readonly placeholder="IP"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="mac" id="mac" value="${dataJson[1][0].mac}" readonly placeholder="MAC"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="velocidadTR" id="velocidadtarjeta" value="${dataJson[1][0].velocidadTR}" readonly placeholder="Velocidad Tarjeta"></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="marcaTR" id="marcatarjeta" value="${dataJson[1][0].marcaTR}" readonly placeholder="Marca Tarjata"></input>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <h2>4. SISTEMA OPERATIVO INSTALADO</h2>
                            <br>
                            <div class="v_div">
                                <label for="so">Descripción</label>
                                <input type="text" name="so" id="so" value="${dataJson[1][0].so}" readonly placeholder="Sistema Operativo">
                            </div>

                            <h2>5. MANTENIMIENTO</h2>
                            <div class="">
                                <div class="">
                                    <p>
                                        <label for="fecha-realizacion">Fecha Realización</label>
                                        <input required type="date" name="fecharealizacion" id="fecharealizacion" value="">
                                    </p>

                                    <label for="realizo">Realizó, Nombre del profesional de apoyo</label>
                                    <select  required name="realizo" id="realizo">`
            dataJson[2].forEach(item => {
                myNode += `<option value="${item.cedula}">${item.nombre}</option>`
            })

            myNode += `
                                    </select>
                                    <!--<input required type="text" name="realizo" id="realizo" placeholder="Nombre Profesional de Apoyo"
                                        value="">-->


                                    <p>
                                        <label for="observaciones">Observaciones</label>
                                        <textarea required name="observaciones" id="observaciones" rows="8" cols="80"></textarea>
                                    </p>
                                </div>
                                <div class="">
                                    <p>
                                        <label for="responsable">Responsable</label>
                                        <input  type="text" name="usrresponsable" id="usrresponsable" value="${dataJson[1][0].nombre}" readonly></input>
                                    </p>
                                    <div id="dv" style="border:none" width="100%">
                                        <label for="canvas">Firma Usuario Responsable</label>
                                        <canvas required id="canvas" style="border:solid black 2px;"></canvas>
                                    </div>
                                    <button id="clear-firm" type="button" name="button" class="boton_personalizado">Borrar
                                        firma</button>
                                    <button id="send-firm" type="button" name="button" style="display: none">Enviar Firma</button>
                                    <textarea required id="data-url" name="data-url" width="100%" style="display: none">
                                    </textarea>
                                    <img id="img-firm" width="100%" src="" height="auto" alt="">
                                </div>
                            </div>
                            <h2>6. UBICACIÓN ACTUAL</h2>
                            <div class="">
                                <table class="egt">
                                    <tr>
                                        <th><label for="usrresponsable"> Usuario Responsable</label></th>
                                        <th><label for="ubicacion"> Ubicación dentro de la empresa</label></th>
                                        <th><label for="fecha"> Fecha</label></th>
                                        <th><label for="firma"> Firma Responsable</label></th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input class="text-input-center" type="text" name="usrresponsable" id="usrresponsable"
                                                value="${dataJson[1][0].nombre}" readonly></input>
                                        </td>
                                        <td>
                                            <input class="text-input-center" type="text" name="ubicacion" id="ubicacion"
                                                value="${dataJson[1][0].proceso}" readonly></input>
                                        </td>
                                        <td class="padding-bottom-edit">
                                            <input class="text-input-center" type="date" name="fecha" id="fecha"
                                                value="${dataJson[1][0].fechaEntrega}" readonly></input>
                                        </td>
                                        <td>
                                            <img height="30px" src="${dataJson[1][0].firma}">
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <h2><label for="recomendaciones">7. RECOMENDACIONES Y/O OBSERVACIONES</label></h2>
                            <div class="v_div">
                                <textarea style="box-sizing: border-box;" name="recomendaciones" name="recomendaciones" id="recomendaciones" rows="8" cols="80" readonly>${dataJson[1][0].recomendaciones}</textarea>
                            </div>
                            <input style="display: none" type="text" id="nuevo" name="nuevo" value="nuevo">
                            <div class="button-container">
                                <button id="" type="submit" class="boton_personalizado" name="button">GUARDAR</button>
                            </div>
                            <br>
                            <br>
                            <br>
                            <br>
                        </form>
                    </section>
                </div>
                `
            return myNode
            break

        case 'hojaDeVida':
            myNode = `
                <h1>Saludo2</h1>
                `
            return myNode
            break;

        case 'inactivos':
            myNode = `
                <h1>Saludo3</h1>
                `
            return myNode
            break;

        default:
            /**
             * VISTA DENEGADO
             */
            return `<h1>vista predefinida</h1>`
    }
}
}
