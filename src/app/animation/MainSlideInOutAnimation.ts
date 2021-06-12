import {
  trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const MainSlideInOutAnimation = [
  trigger('mainSlideInOut', [
    state('in', style({
      'width': '{{ min_width }}'
    }), { params: { min_width: '300px' } }),
    state('out', style({
      'width': '{{ max_width }}',
    }), { params: { max_width: '300px' } }),
    transition('in <=> out', animate('0.5s ease'))
  ]),
]
