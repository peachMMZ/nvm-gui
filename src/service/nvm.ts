import shellApi from '@/api/shell';

class NvmService {

  public arch(onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['arch'],
      onOutDataCallback,
      onErrDataCallback
    });
  }

  public version() {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['version'],
    });
  }

  public current() {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['current'],
    });
  }

  public list(available = false, onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    const args = ['list']
    if (available) args.push('available')
    return shellApi.commandExecute({
      program: 'nvm',
      args,
      onOutDataCallback,
      onErrDataCallback
    });
  }

  public use(nodeVersion: string, onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['use', nodeVersion],
      onOutDataCallback,
      onErrDataCallback
    });
  }

  public install(version: string, onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['install', version],
      onOutDataCallback,
      onErrDataCallback
    });
  }

  public uninstall(version: string, onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['uninstall', version],
      onOutDataCallback,
      onErrDataCallback
    });
  }

  public proxy(none = false, onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    const args = ['proxy']
    if (none) args.push('none')
    return shellApi.commandExecute({
      program: 'nvm',
      args,
      onOutDataCallback,
      onErrDataCallback
    });
  }

  public nodeMirror(url: string, onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['node_mirror', url],
      onOutDataCallback,
      onErrDataCallback
    });
  }

  public npmMirror(url: string, onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['npm_mirror', url],
      onOutDataCallback,
      onErrDataCallback
    });
  }

  public debug(onOutDataCallback?: (data: string) => void, onErrDataCallback?: (data: string) => void) {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['debug'],
      onOutDataCallback,
      onErrDataCallback
    });
  }
}

export default new NvmService();