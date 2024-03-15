import shellApi from '@/api/shell';

class NvmService {
  public getNvmVersion() {
    return shellApi.commandExecute({
      program: 'nvm',
      args: ['version'],
      onOutDataCallback(data) {
        console.log(data);
      },
    });
  } 
}

export default new NvmService();