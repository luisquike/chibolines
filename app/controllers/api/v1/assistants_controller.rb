class Api::V1::AssistantsController < Api::V1::BaseController
	
	before_action :set_assistant, only: [:update, :destroy]

	def index
		begin
	  	  render json: Assistant.select(:id, :name, :group, :address, :phone).order(sort_by + ' ' + order).to_json, status: :ok
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
    end

    def search 
    	begin
		  activities = Assistant.searching(params[:query])

		  render json: activities, status: :ok
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def create
		begin
		  assistant = Assistant.new(assistant_params)
		  if assistant.save
		    render json: assistant, status: :created
		  else
		    render json: assistant.errors, status: :bad_request
		  end
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def update
		begin
	      if @assistant.update(assistant_params)
	        render json: @assistant, status: :ok
	      else
		    render json: @assistant.errors, status: :bad_request
	      end
      	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def destroy
		begin
		  @assistant.destroy
		  head :no_content
      	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	private

	def assistant_params
	  params.require(:assistant).permit(:name, :group, :address, :phone)
	end

	def set_assistant
	  @assistant = Assistant.find(params[:id])
	end

	def sort_by
      %w(name
         group
         address
         phone).include?(params[:sort_by]) ? params[:sort_by] : 'name'
    end

    def order
      %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
	end
end