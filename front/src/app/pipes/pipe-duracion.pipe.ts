import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeDuracion'
})
export class PipeDuracionPipe implements PipeTransform {

  transform(duration: number): string {
    const duracionSegundos = Math.floor(duration / 1000);
    // Calcular minutos y segundos
    const minutos = Math.floor(duracionSegundos / 60);
    const segundos = duracionSegundos % 60;
    // Formatear el resultado
    const resultado = minutos.toString().padStart(1, '0') + ':' + segundos.toString().padStart(2, '0');
    return resultado;
  }

}
