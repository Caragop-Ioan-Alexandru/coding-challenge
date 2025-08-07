import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const gridAnimation = trigger('gridAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        stagger(50, [
          animate(
            '200ms ease-out',
            style({ opacity: 1, transform: 'scale(1)' })
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
            '150ms ease-in',
            style({ opacity: 0, transform: 'scale(0.9)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
