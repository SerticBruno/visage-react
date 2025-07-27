# BeautyTreatmentModal Component

A specialized modal component designed specifically for displaying beauty treatment information in an elegant and user-friendly format.

## Features

### 🎨 **Specialized Design**
- Optimized layout for beauty treatment information
- Color-coded sections for different types of information
- Responsive design that works on all screen sizes

### 📋 **Information Display**
- **Treatment Details**: Title, duration, and price prominently displayed
- **Benefits**: Color-coded green section showing treatment benefits
- **Suitable For**: Blue section indicating who the treatment is ideal for
- **Preparation**: Amber section with pre-treatment instructions
- **Procedure**: Purple section detailing the treatment process
- **Aftercare**: Green section with post-treatment care instructions

### 🏷️ **Visual Elements**
- Treatment image with professional styling
- Status badges (New, Popular) with icons
- Color-coded information cards
- Professional icons for each section
- Call-to-action button for booking

### ⌨️ **User Experience**
- Escape key support for closing
- Click outside to close functionality
- Smooth animations and transitions
- Scrollable content area for longer treatments

## Usage

```tsx
import BeautyTreatmentModal from '@/components/ui/BeautyTreatmentModal';
import { BeautyTreatment } from '@/data/services/beautyTreatments';

// In your component
const [selectedTreatment, setSelectedTreatment] = useState<BeautyTreatment | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const handleTreatmentClick = (treatment: BeautyTreatment) => {
  setSelectedTreatment(treatment);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setTimeout(() => {
    setSelectedTreatment(null);
  }, 300);
};

// In your JSX
<BeautyTreatmentModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  treatment={selectedTreatment}
/>
```

## Data Structure

The modal expects a `BeautyTreatment` object with the following structure:

```typescript
interface BeautyTreatment {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  benefits: string[];
  suitableFor: string[];
  preparation: string;
  procedure: string;
  aftercare: string;
  isPopular?: boolean;
  isNew?: boolean;
}
```

## Sections

### Header Section
- Treatment title
- Duration and price
- Status badges (New, Popular)

### Left Panel (Fixed)
- Treatment image
- Benefits list (green theme)
- Suitable for list (blue theme)

### Right Panel (Scrollable)
- Treatment description
- Preparation instructions (amber theme)
- Procedure details (purple theme)
- Aftercare instructions (green theme)
- Pro tip section
- Safety information (yellow theme)
- Booking call-to-action (rose theme)

## Styling

The modal uses a sophisticated color scheme:
- **Green**: Benefits and aftercare (positive, nurturing)
- **Blue**: Suitable for (informational, trustworthy)
- **Amber**: Preparation (warning, attention)
- **Purple**: Procedure (premium, professional)
- **Yellow**: Safety (caution, important)
- **Rose**: Call-to-action (action, urgency)

## Responsive Design

- **Desktop**: Two-column layout with fixed left panel and scrollable right panel
- **Mobile**: Single-column layout with stacked sections
- **Tablet**: Adaptive layout that adjusts based on screen size

## Accessibility

- Keyboard navigation support (Escape key)
- Proper ARIA labels and semantic HTML
- Focus management
- Screen reader friendly structure

## Integration

This modal is currently integrated into:
- `BeautyTreatmentsSection` component
- Used on the beauty treatments service page

## Future Enhancements

Potential improvements could include:
- Integration with booking system
- Related treatments suggestions
- Before/after images
- Customer reviews
- Treatment comparison feature 