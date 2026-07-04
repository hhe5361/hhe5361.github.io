import { useEffect } from 'react';

const defaultSections = ['about', 'portfolio', 'contact'];

export const useKeyboardNavigation = (
  enabled = true,
  sections: string[] = defaultSections,
) => {
  const sectionKey = sections.join('|');

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const scrollToSection = (sectionId: string | undefined) => {
      if (!sectionId) {
        return false;
      }

      const element = document.getElementById(sectionId);

      if (!element) {
        return false;
      }

      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const availableSections = sections.filter((sectionId) =>
        document.getElementById(sectionId),
      );

      if (availableSections.length === 0) {
        return;
      }

      const currentSection = availableSections.find((sectionId) => {
        const element = document.getElementById(sectionId);

        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      const currentIndex = currentSection
        ? availableSections.indexOf(currentSection)
        : -1;

      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown': {
          const nextSectionId =
            currentIndex >= 0
              ? availableSections[currentIndex + 1]
              : availableSections[0];

          if (scrollToSection(nextSectionId)) {
            event.preventDefault();
          }
          break;
        }
        case 'ArrowUp':
        case 'PageUp': {
          const previousSectionId =
            currentIndex > 0
              ? availableSections[currentIndex - 1]
              : availableSections[0];

          if (scrollToSection(previousSectionId)) {
            event.preventDefault();
          }
          break;
        }
        case 'Home':
          if (scrollToSection(availableSections[0])) {
            event.preventDefault();
          }
          break;
        case 'End':
          if (scrollToSection(availableSections[availableSections.length - 1])) {
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, sectionKey, sections]);
};
