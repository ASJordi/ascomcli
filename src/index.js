import { intro, outro, text, select, confirm, multiselect, isCancel } from '@clack/prompts';
import colors from 'picocolors';
import { trytm } from '@bdsqqq/try';

import { exitProgram } from './utils.js';
import { COMMIT_TYPES } from './commit-types.js';
import { getChangedFiles, getStagedFiles, gitAdd, gitCommit } from './git.js';

intro(
  colors.inverse(`Asistente para la creación de commits por ${colors.yellow('@asjordi')}`)
);

const [changedFiles, errorChangedFiles] = await trytm(getChangedFiles());
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles());

if (errorChangedFiles ?? errorStagedFiles) {
  outro(colors.red('Error: Comprueba que estás en un repositorio de git'));
  process.exit(1);
}

if (stagedFiles.length === 0 && changedFiles.length > 0) {
  const files = await multiselect({
    message: colors.cyan('Selecciona los ficheros que quieres añadir al commit: \n' + `   Changed files: ${colors.red(changedFiles.length)}, Staged files: ${colors.green(stagedFiles.length)}`),
    options: changedFiles.map(file => ({
      value: file,
      label: file
    }))
  });

  if (isCancel(files)) exitProgram();

  await gitAdd({ files });
}

const commitType = await select({
  message: colors.cyan('Selecciona el tipo de commit:'),
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(10, ' ')} · ${value.description}`
  }))
});

if (isCancel(commitType)) exitProgram();

const hasScope = await confirm({
  initialValue: false,
  message: `${colors.cyan('¿Tiene este commit un Scope?')}`
});

if (isCancel(hasScope)) exitProgram();

let commitScope;

if (hasScope) {
  commitScope = await text({
    message: colors.cyan('Introduce el alcance del commit:'),
    validate: (value) => {
      if (value.length === 0) {
        return colors.red('El alcance no puede estar vacío');
      }
      if (value.length > 30) {
        return colors.red('El alcance no puede tener más de 30 caracteres');
      }
    }
  });
}

if (isCancel(commitScope)) exitProgram();

const commitMessage = await text({
  message: colors.cyan('Introduce el mensaje del commit:'),
  validate: (value) => {
    if (value.length === 0) {
      return colors.red('El mensaje no puede estar vacío');
    }

    if (value.length > 100) {
      return colors.red('El mensaje no puede tener más de 100 caracteres');
    }
  }
});

if (isCancel(commitMessage)) exitProgram();

const { emoji, release } = COMMIT_TYPES[commitType];

let breakingChange = false;
if (release) {
  breakingChange = await confirm({
    initialValue: false,
    message: `${colors.cyan('¿Tiene este commit cambios que rompen la compatibilidad anterior?')}`
  });

  if (isCancel(breakingChange)) exitProgram();
}

let commit = commitType;

commit = commitScope ? `${commit} (${commitScope})` : commit;

commit += `: ${emoji} ${commitMessage}`;

commit = breakingChange ? `${commit} [breaking change]` : commit;

const shouldContinue = await confirm({
  initialValue: true,
  message: `${colors.cyan('¿Quieres crear el commit con el siguiente mensaje?')}
  ${colors.green(colors.bold(commit))}
  ${colors.cyan('¿Continuar?')}`
});

if (isCancel(shouldContinue)) exitProgram();

if (!shouldContinue) {
  outro(colors.yellow('No se ha creado el commit'));
  process.exit(0);
}

await gitCommit({ commit });

outro(
  colors.green('✅ Commit creado con éxito.')
);
