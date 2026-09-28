"use client";

export type CaptchaChallenge = { a: number; b: number; proof: string };

/** Short addition check. The sum is verified again by the PHP form handler. */
export function MathCaptcha({
  idPrefix,
  challenge,
  error,
}: {
  idPrefix: string;
  challenge: CaptchaChallenge | null;
  error?: string;
}) {
  const id = `${idPrefix}-captcha`;
  const question = challenge ? `${challenge.a} + ${challenge.b}` : "…";
  return (
    <div className={`field field--captcha${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        What is {question}? <span aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        name="captcha_answer"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        required
        maxLength={2}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error ${id}-hint` : `${id}-hint`}
      />
      <input type="hidden" name="captcha_a" value={challenge?.a ?? ""} />
      <input type="hidden" name="captcha_b" value={challenge?.b ?? ""} />
      <input type="hidden" name="captcha_proof" value={challenge?.proof ?? ""} />
      <p className="field__hint" id={`${id}-hint`}>
        Enter the sum. This keeps automated messages out.
      </p>
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
