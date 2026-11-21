import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBatchProgress,
  formatOfferDeadlinePtBr,
  getRemainingTimeUntilEndOfDay,
  hasVerifiedSocialProof,
  isLiveCheckoutUrl,
  shouldShowPreviousPrice,
} from './offerLogic';

test('getRemainingTimeUntilEndOfDay computes padded HH:MM:SS cleanly', () => {
  const sample = new Date(2026, 10, 20, 21, 15, 30, 0);
  const result = getRemainingTimeUntilEndOfDay(sample);
  assert.equal(result.hours, '02');
  assert.equal(result.minutes, '44');
  assert.equal(result.seconds, '29');
  assert.equal(result.formatted, '02:44:29');
});

test('getRemainingTimeUntilEndOfDay clamps at final second of the day', () => {
  const endMoment = new Date(2026, 10, 20, 23, 59, 59, 999);
  const result = getRemainingTimeUntilEndOfDay(endMoment);
  assert.equal(result.formatted, '00:00:00');
  assert.equal(result.totalSeconds, 0);
});

test('calculateBatchProgress clamps bounds and reports remaining slots', () => {
  const normal = calculateBatchProgress(84, 100);
  assert.equal(normal.percent, 84);
  assert.equal(normal.remaining, 16);
  assert.equal(normal.isAlmostFull, true);

  const overflow = calculateBatchProgress(150, 100);
  assert.equal(overflow.percent, 100);
  assert.equal(overflow.remaining, 0);

  const negative = calculateBatchProgress(-10, 50);
  assert.equal(negative.percent, 0);
  assert.equal(negative.remaining, 50);
  assert.equal(negative.isAlmostFull, false);
});

test('isLiveCheckoutUrl rejects placeholder and invalid URLs', () => {
  assert.equal(isLiveCheckoutUrl('[LINK_CHECKOUT]'), false);
  assert.equal(isLiveCheckoutUrl(''), false);
  assert.equal(isLiveCheckoutUrl('javascript:alert(1)'), false);
  assert.equal(isLiveCheckoutUrl('https://pay.kiwify.com.br/exemplo'), true);
});

test('shouldShowPreviousPrice only returns true when flagged as real', () => {
  assert.equal(shouldShowPreviousPrice({ display: 'R$47', isRealPreviousPrice: false }), false);
  assert.equal(shouldShowPreviousPrice({ display: 'R$47', isRealPreviousPrice: true }), true);
  assert.equal(shouldShowPreviousPrice({ display: '   ', isRealPreviousPrice: true }), false);
});

test('formatOfferDeadlinePtBr formats ISO date into DD/MM/YYYY without timezone drift', () => {
  assert.equal(formatOfferDeadlinePtBr('2026-11-30T23:59:59'), '30/11/2026');
  assert.equal(formatOfferDeadlinePtBr('2027-01-15'), '15/01/2027');
});

test('hasVerifiedSocialProof stays false until a real image URL is provided', () => {
  assert.equal(
    hasVerifiedSocialProof(
      [{ id: '1', imageUrl: null, name: '[Nome]', city: '[cidade]' }],
      [{ id: 'm1', imageUrl: null, channel: 'WhatsApp', label: 'Depoimento' }],
    ),
    false,
  );
  assert.equal(
    hasVerifiedSocialProof(
      [{ id: '1', imageUrl: '/prints/aluno-1.jpg', name: 'Lucas', city: 'SP' }],
      [],
    ),
    true,
  );
});
