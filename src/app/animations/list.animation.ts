import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        stagger(50, [
          animate(
            '200ms ease-out',
            style({ opacity: 1, transform: 'translateX(0)' })
          ),
        ]),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        stagger(50, [
          animate(
            '200ms ease-in',
            style({ opacity: 0, transform: 'translateX(20px)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
