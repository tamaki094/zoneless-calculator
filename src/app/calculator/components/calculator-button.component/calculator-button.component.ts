import { Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  }
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform:(value: boolean | string) =>
      typeof value === 'string'? value === '': value,
  })

  public isDoubleSize = input(false, {
    transform:(value: boolean | string) =>
      typeof value === 'string'? value === '': value,
  })

  /**
   * @HostBinding('class') : Esto vincula toda la propiedad class del elemento HTML al resultado del método.
   * Puedes devolver una cadena con múltiples clases.
   * Angular reemplaza las clases del host con las que tú devuelvas.
   * ------------------------------------------------------------------------------------------------
   * @HostBinding('class.bg-indigo-700')
   * Esto vincula directamente una clase específica (bg-indigo-700) al resultado del método o propiedad.
   * Si el método devuelve true, Angular agrega esa clase al elemento del componente.
   * Si devuelve false, no la agrega.
   */
  @HostBinding('class') get hostClasses(){ //bg-opacity-20

    const classes = [];

    if (this.isCommand()) {
      classes.push('bg-indigo-700/20');
    }

    if (this.isDoubleSize()) {
      classes.push('w-2/4');
    }
    else {
      classes.push('w-1/4');
    }

    return classes.join(' ');
  }

  @HostBinding('class.pressed') get isPressedClass() {
    return this.isPressed();
  }

  handleClick(){
    if(!this.contentValue()?.nativeElement){
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText
    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string){
    if(!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if(value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }
}


