import { ChildProcess, Command } from '@tauri-apps/api/shell'

type ProgramOption = 'nvm'

interface CommandExecuteArgs {
  program: ProgramOption,
  args: string | string[], 
  onOutDataCallback?: (data: string) => void, 
  onErrDataCallback?: (data: string) => void
}

class ShellApi {
  public commandSidecar(params: CommandExecuteArgs): Promise<ChildProcess> {
    const { program, args, onOutDataCallback, onErrDataCallback } = params
    const command = Command.sidecar(program, args)
    if (onOutDataCallback) command.stdout.on('data', onOutDataCallback)
    if (onErrDataCallback) command.stderr.on('data', onErrDataCallback)
    return command.execute()
  }

  public commandExecute(params: CommandExecuteArgs): Promise<ChildProcess> {
    const { program, args, onOutDataCallback, onErrDataCallback } = params
    const command = new Command(program, args)
    if (onOutDataCallback) command.stdout.on('data', onOutDataCallback)
    if (onErrDataCallback) command.stderr.on('data', onErrDataCallback)
    return command.execute()
  }
}

export default new ShellApi()