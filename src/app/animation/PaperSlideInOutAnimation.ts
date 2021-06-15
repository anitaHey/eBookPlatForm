import {
  trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const ObjSlideInOutAnimation = [
  trigger('objSlideInOut', [
    state('change', style({
      'width': '{{ new_width }}',
      'height': '{{ new_height }}'
    }), { params: { new_width: '100px', new_height: '100px' } }),
    state('change1', style({
      'width': '{{ new_width }}',
      'height': '{{ new_height }}'
    }), { params: { new_width: '100px', new_height: '100px' } }),
    transition('* <=> *', animate('1s ease'))
  ]),
]
