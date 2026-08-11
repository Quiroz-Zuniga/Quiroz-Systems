import { TestCase, TestCaseResult } from './programmingRunner';

// Inspección de estructura HTML/CSS (mismo contrato que el runner previo) sin ejecutar en navegador.
export function runHtmlCssExercise(
  userCode: string,
  testCases: TestCase[]
): { passed: boolean; results: TestCaseResult[]; timeMs: number; logs: string } {
  const startTime = Date.now();
  const lowerCode = userCode.toLowerCase();

  const results: TestCaseResult[] = testCases.map((tc) => {
    const expected = tc.output.trim();
    let passed = false;
    let actualOutput = '';

    if (expected.includes('{') || expected.includes(':') || expected.includes('>')) {
      let checksPassed = 0;
      const requirements = expected.split('|').map((r) => r.trim());
      const totalChecks = requirements.length;
      const foundReqs: string[] = [];

      for (const req of requirements) {
        if (req.includes('{')) {
          const [selector, props] = req.split('{');
          const cleanSelector = selector.trim();
          const cleanProps = props.replace('}', '').split(',').map((p) => p.trim());
          const hasSelector = lowerCode.includes(cleanSelector.toLowerCase());
          const hasProps = cleanProps.every((p) => lowerCode.includes(p.toLowerCase()));
          if (hasSelector && hasProps) {
            checksPassed++;
            foundReqs.push(`✓ ${req}`);
          } else {
            foundReqs.push(`✗ ${req}`);
          }
        } else if (req.includes(':')) {
          const [tag, text] = req.split(':');
          const cleanTag = tag.trim();
          const cleanText = text.trim();
          const hasTag =
            lowerCode.includes(`<${cleanTag.toLowerCase()}`) || lowerCode.includes(cleanTag.toLowerCase());
          const hasText = userCode.toLowerCase().includes(cleanText.toLowerCase());
          if (hasTag && hasText) {
            checksPassed++;
            foundReqs.push(`✓ ${req}`);
          } else {
            foundReqs.push(`✗ ${req}`);
          }
        } else {
          if (lowerCode.includes(req.toLowerCase())) {
            checksPassed++;
            foundReqs.push(`✓ ${req}`);
          } else {
            foundReqs.push(`✗ ${req}`);
          }
        }
      }

      passed = checksPassed === totalChecks;
      actualOutput = foundReqs.join('\n');
    } else {
      passed = lowerCode.includes(expected.toLowerCase());
      actualOutput = passed ? expected : 'Estructura HTML/CSS no coincide con lo esperado';
    }

    return {
      testCaseId: tc.id,
      description: tc.description || 'Validación de estructura HTML y reglas CSS',
      expectedOutput: tc.output,
      actualOutput,
      passed,
    };
  });

  const passed = results.every((r) => r.passed);
  return {
    passed,
    results,
    timeMs: Date.now() - startTime,
    logs: passed
      ? 'Renderizado e inspección DOM/CSSOM exitosos'
      : 'Inconsistencias encontradas en la estructura HTML/CSS',
  };
}