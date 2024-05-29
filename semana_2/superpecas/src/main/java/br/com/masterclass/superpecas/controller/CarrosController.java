package br.com.masterclass.superpecas.controller;

import br.com.masterclass.superpecas.model.DTO.ApiResponse;
import br.com.masterclass.superpecas.model.DTO.CarroDTO;
import br.com.masterclass.superpecas.model.DTO.TopKFabricantesDTO;
import br.com.masterclass.superpecas.service.CarrosService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carro")
public class CarrosController {

    @Autowired
    private CarrosService carrosService;

    @RequestMapping(method = RequestMethod.GET, value = "/listaTodos")
    public ApiResponse<List<CarroDTO>> listarTodos() {
        List<CarroDTO> listaCarrosDTO = this.carrosService.listarTodos();

        return new ApiResponse<>("Sucesso!", listaCarrosDTO);
    }

    @RequestMapping(method = RequestMethod.GET, value = "{id}")
    public ApiResponse<CarroDTO> buscarPorId(@PathVariable Long id) {
        CarroDTO carro = this.carrosService.buscarPorId(id);

        return new ApiResponse<CarroDTO>("Sucesso!", carro);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/listaTodosPaginado")
    public ApiResponse<Page<CarroDTO>> listarTodosPaginado(@RequestParam int page, @RequestParam int size) {
        Page<CarroDTO> paginaCarroDTO = this.carrosService.listarTodosPaginado(page, size);

        return new ApiResponse<>("Sucesso!", paginaCarroDTO);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/listaTodosFabricantes")
    public ApiResponse<List<String>> listarTodosFabricantes (){
        List<String> listaFabricantes = this.carrosService.listarTodosFabricantes();
        return new ApiResponse<>("Sucesso!", listaFabricantes);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/listaTodosPaginado/{termo}")
    public ApiResponse<Page<CarroDTO>> listarTodosPaginado(
            @PathVariable String termo,
            @RequestParam int page,
            @RequestParam int size) {

        Page<CarroDTO> paginaCarroDTO = this.carrosService.listarTodosPaginado(termo, page, size);
        return new ApiResponse<>("Sucesso!", paginaCarroDTO);
    }

    @RequestMapping(method = RequestMethod.GET, value = "listaTop10Fabricantes")
    public ApiResponse<List<TopKFabricantesDTO>> listaTop10Fabricantes() {
        List<TopKFabricantesDTO> listaFabricantes = this.carrosService.listarTop10Fabricantes();
        return new ApiResponse<>("Sucesso", listaFabricantes);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ApiResponse<CarroDTO> adicionarCarro(
            @RequestBody CarroDTO carroDTO
    ) {
        CarroDTO dto = this.carrosService.adicionarCarro(carroDTO);
        return new ApiResponse<>("Sucesso!", dto);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "{id}")
    public ApiResponse<CarroDTO> atualizarCarro(
            @PathVariable Long id,
            @RequestBody CarroDTO dto
    ) {
        CarroDTO dadosCarroRetorno = this.carrosService.editarCarro(id, dto);

        return new ApiResponse<>(
                "Atualizado com sucesso",
                dadosCarroRetorno
        );
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "{id}")
    public ApiResponse<String> deletarCarro(
            @PathVariable Long id
    ) {
        this.carrosService.excluirCarro(id);
        return new ApiResponse<>("Deletado com sucesso!", null);
    }
}
