/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Container from '@/components/Container';

describe('Container Component', () => {
    it('renders container such as footer and header', async () => {
        render(<Container />);

        expect(screen.getByText('Nuzlog')).toBeInTheDocument();
    });
});