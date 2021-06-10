import {
  trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('in', style({
      'max-width': '{{ max_width }}'
    }), { params: { max_width: '300px' } }),
    state('out', style({
      'max-width': '0px',
    })),
    transition('in <=> out', animate('0.5s ease'))
  ]),
]
