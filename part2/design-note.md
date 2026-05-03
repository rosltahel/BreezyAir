
I redesigned the “How It Works” section from simple step cards into a horizontal timeline. Each step uses a numbered circle, with a connector line showing progression from step 1 to step 3.

I used CSS Grid to keep the three steps evenly spaced on desktop. The connector line is created with a CSS pseudo-element instead of extra HTML. The hover state uses transform, scale, shadow, and border transitions so the active step feels highlighted without relying only on a color change.

For mobile screens below 768px, the timeline switches to a vertical layout so the content stays readable and easy to follow.

I also added an optional Intersection Observer animation so the steps fade and slide into view when the section appears on screen.
