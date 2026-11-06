import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('показує кількість знайдених і передає введений текст', () => {
    const onQueryChange = vi.fn();
    render(
      <SearchBar
        query=""
        onQueryChange={onQueryChange}
        sortBy="recommended"
        onSortChange={() => {}}
        count={21}
      />
    );

    expect(screen.getByText('Знайдено 21 репетитор')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Пошук репетитора'), { target: { value: 'фізика' } });
    expect(onQueryChange).toHaveBeenCalledWith('фізика');
  });
});
