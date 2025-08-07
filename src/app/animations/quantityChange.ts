import { animate, style, transition, trigger } from '@angular/animations';

export const quantityChange = trigger('quantityChange', [
  transition('* => *', [
    style({ transform: 'scale(1)', opacity: 1 }),
    animate('150ms ease-out', style({ transform: 'scale(1.3)', opacity: 0.8 })),
    animate('100ms ease-in', style({ transform: 'scale(1)', opacity: 1 })),
  ]),
]);
